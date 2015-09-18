/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'omit-parens-in-void-context-iife';
  common = require("../common");
  Syntax = common.Syntax;
  function isIIFE(node) {
    var callee;
    if (node.type !== Syntax.CallExpression) {
      return false;
    }
    callee = node.callee;
    return callee.type === Syntax.FunctionExpression;
  }
  function main(tree, options) {
    var result,
        stackCount,
        preserveCompletionValue;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    preserveCompletionValue = options.get('preserveCompletionValue', {pathName: Name});
    modified = false;
    result = common.replace(result, {
      enter: function enter(node, parent) {
        var ancestors,
            target;
        if (!isIIFE(node)) {
          return;
        }
        target = parent;
        if (target.type === Syntax.ExpressionStatement) {
          ancestors = this.parents();
          ancestors.pop();
          if (preserveCompletionValue && common.mayBeCompletionValue(target, ancestors)) {
            return;
          }
        } else if (target.type === Syntax.SequenceExpression && target.expressions.length >= 2 && target.expressions[0] === node) {
          ancestors = this.parents();
          ancestors.pop();
          target = ancestors.pop();
          if (target.type !== Syntax.ExpressionStatement) {
            return;
          }
        } else {
          return;
        }
        modified = true;
        return {
          type: Syntax.UnaryExpression,
          operator: '!',
          argument: node
        };
      },
      leave: function leave(node) {
        if (node.type === Syntax.FunctionExpression || node.type === Syntax.FunctionDeclaration) {
          --stackCount;
        }
      }
    });
    return {
      result: result,
      modified: modified
    };
  }
  main.passName = Name;
  module.exports = main;
}());
