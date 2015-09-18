/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'remove-empty-statement';
  common = require("../common");
  Syntax = common.Syntax;
  function remove(array) {
    var i,
        iz,
        node,
        result;
    result = [];
    for (i = 0, iz = array.length; i < iz; ++i) {
      node = array[i];
      if (node.type === Syntax.EmptyStatement) {
        modified = true;
      } else {
        result.push(node);
      }
    }
    return result;
  }
  function removeAlternate(node) {
    if (node.alternate) {
      if (node.alternate.type === Syntax.EmptyStatement) {
        modified = true;
        node.alternate = null;
      } else if (node.consequent.type === Syntax.EmptyStatement) {
        modified = true;
        node.consequent = node.alternate;
        node.alternate = null;
        node.test = common.moveLocation(node.test, {
          type: Syntax.UnaryExpression,
          operator: '!',
          argument: node.test
        });
      }
    }
  }
  function removeEmptyStatement(tree, options) {
    var result;
    modified = false;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    common.traverse(result, {enter: function enter(node) {
        var clause;
        switch (node.type) {
          case Syntax.BlockStatement:
          case Syntax.Program:
            node.body = remove(node.body);
            break;
          case Syntax.SwitchCase:
            node.consequent = remove(node.consequent);
            break;
          case Syntax.IfStatement:
            removeAlternate(node);
            break;
          case Syntax.SwitchStatement:
            if (node.cases.length) {
              clause = common.Array.last(node.cases);
              if (!clause.test && common.Array.empty(clause.consequent)) {
                modified = true;
                node.cases.pop();
              }
            }
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  removeEmptyStatement.passName = Name;
  module.exports = removeEmptyStatement;
}());
