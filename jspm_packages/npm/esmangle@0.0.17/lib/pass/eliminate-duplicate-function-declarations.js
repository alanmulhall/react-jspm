/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      Map,
      common,
      modified;
  Name = 'eliminate-duplicate-function-declarations';
  common = require("../common");
  Map = require("../map");
  Syntax = common.Syntax;
  function unique(map, root) {
    return common.replace(root, {enter: function(node) {
        var name,
            info;
        if (node.type === Syntax.FunctionDeclaration) {
          name = node.id.name;
          info = map.get(name);
          --info.count;
          if (info.count !== 0) {
            modified = true;
            return common.moveLocation(node, {type: Syntax.EmptyStatement});
          }
        }
        if (node !== root && node.type === Syntax.BlockStatement) {
          return this.skip();
        }
      }});
  }
  function uniqueInGlobal(map, root) {
    return common.replace(root, {enter: function(node) {
        var name,
            info,
            first;
        if (node.type === Syntax.FunctionDeclaration) {
          name = node.id.name;
          info = map.get(name);
          first = info.count === info.declarations.length;
          --info.count;
          if (info.declarations.length > 1) {
            if (first) {
              modified = true;
              return common.Array.last(info.declarations);
            } else {
              modified = true;
              return common.moveLocation(node, {type: Syntax.EmptyStatement});
            }
          }
        }
        if (node !== root && node.type === Syntax.BlockStatement) {
          return this.skip();
        }
      }});
  }
  function main(tree, options) {
    var result,
        stack,
        functionDepth,
        globalBlockFound;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    functionDepth = 0;
    globalBlockFound = false;
    stack = [new Map()];
    result = common.replace(result, {
      enter: function enter(node) {
        var map,
            name,
            info;
        if (node.type === Syntax.FunctionDeclaration) {
          name = node.id.name;
          map = common.Array.last(stack);
          if (map.has(name)) {
            info = map.get(name);
            info.declarations.push(node);
            ++info.count;
          } else {
            info = {
              declarations: [node],
              count: 1
            };
            map.set(name, info);
          }
        }
        if (node.type === Syntax.BlockStatement) {
          stack.push(new Map());
        }
        if (node.type === Syntax.FunctionDeclaration || node.type === Syntax.FunctionExpression) {
          ++functionDepth;
        }
      },
      leave: function leave(node) {
        var map,
            ret;
        if (node.type === Syntax.BlockStatement) {
          map = stack.pop();
          if (functionDepth === 0) {
            if (map.keys().length !== 0) {
              globalBlockFound = true;
            }
          } else {
            ret = unique(map, node);
          }
        }
        if (node.type === Syntax.FunctionDeclaration || node.type === Syntax.FunctionExpression) {
          --functionDepth;
        }
        return ret;
      }
    });
    common.assert(stack.length === 1, 'global map remains');
    if (!globalBlockFound) {
      result = uniqueInGlobal(stack[0], result);
    }
    return {
      result: result,
      modified: modified
    };
  }
  main.passName = Name;
  module.exports = main;
}());
