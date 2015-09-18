/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'reduce-branch-jump';
  common = require("../common");
  Syntax = common.Syntax;
  function reduceLast(ary, index) {
    var node,
        left;
    node = ary[index];
    if (node.type === Syntax.IfStatement) {
      if (!node.alternate) {
        if (node.consequent.type === Syntax.ReturnStatement) {
          modified = true;
          left = node.consequent.argument;
          if (!left) {
            ary[index] = common.moveLocation(node, {
              type: Syntax.ReturnStatement,
              argument: {
                type: Syntax.SequenceExpression,
                expressions: [node.test, common.SpecialNode.generateUndefined()]
              }
            });
            return true;
          }
          ary[index] = common.moveLocation(node, {
            type: Syntax.ReturnStatement,
            argument: {
              type: Syntax.ConditionalExpression,
              test: node.test,
              consequent: left,
              alternate: common.SpecialNode.generateUndefined()
            }
          });
          return true;
        }
      }
    }
  }
  function reduce(ary, index) {
    var node,
        sibling,
        left,
        right;
    node = ary[index];
    sibling = ary[index + 1];
    if (node.type === Syntax.IfStatement) {
      if (!node.alternate) {
        if (node.consequent.type === Syntax.ReturnStatement && sibling.type === Syntax.ReturnStatement) {
          modified = true;
          ary.splice(index, 1);
          left = node.consequent.argument;
          right = sibling.argument;
          if (!left && !right) {
            ary[index] = common.moveLocation(node, {
              type: Syntax.ReturnStatement,
              argument: {
                type: Syntax.SequenceExpression,
                expressions: [node.test, common.SpecialNode.generateUndefined()]
              }
            });
            return true;
          }
          if (!left) {
            left = common.SpecialNode.generateUndefined();
          }
          if (!right) {
            right = common.SpecialNode.generateUndefined();
          }
          ary[index] = common.moveLocation(node, {
            type: Syntax.ReturnStatement,
            argument: {
              type: Syntax.ConditionalExpression,
              test: node.test,
              consequent: left,
              alternate: right
            }
          });
          return true;
        }
      }
    }
    return false;
  }
  function reduceBranchJump(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {leave: function leave(node, parent) {
        var i;
        switch (node.type) {
          case Syntax.BlockStatement:
          case Syntax.Program:
            i = 0;
            while (i < (node.body.length - 1)) {
              if (!reduce(node.body, i)) {
                ++i;
              }
            }
            if (common.isFunctionBody(node, parent)) {
              if (node.body.length > 0) {
                i = node.body.length - 1;
                reduceLast(node.body, i);
              }
            }
            break;
          case Syntax.SwitchCase:
            i = 0;
            while (i < (node.consequent.length - 1)) {
              if (!reduce(node.consequent, i)) {
                ++i;
              }
            }
            break;
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  reduceBranchJump.passName = Name;
  module.exports = reduceBranchJump;
}());
