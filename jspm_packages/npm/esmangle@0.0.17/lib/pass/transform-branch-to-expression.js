/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'transform-branch-to-expression';
  common = require("../common");
  Syntax = common.Syntax;
  function transformBranchToExpression(tree, options) {
    var result,
        preserveCompletionValue;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    preserveCompletionValue = options.get('preserveCompletionValue', {pathName: Name});
    modified = false;
    result = common.replace(result, {leave: function leave(node) {
        var consequent,
            alternate,
            ancestors;
        if (node.type === Syntax.IfStatement) {
          ancestors = this.parents();
          if (preserveCompletionValue && common.mayBeCompletionValue(node, ancestors)) {
            return;
          }
          if (node.alternate) {
            if (node.consequent.type === Syntax.ExpressionStatement && node.alternate.type === Syntax.ExpressionStatement) {
              modified = true;
              return common.moveLocation(node, {
                type: Syntax.ExpressionStatement,
                expression: common.moveLocation(node, {
                  type: Syntax.ConditionalExpression,
                  test: node.test,
                  consequent: node.consequent.expression,
                  alternate: node.alternate.expression
                })
              });
            }
            if (node.consequent.type === Syntax.ReturnStatement && node.alternate.type === Syntax.ReturnStatement) {
              modified = true;
              if (!node.consequent.argument && !node.alternate.argument) {
                return common.moveLocation(node, {
                  type: Syntax.ReturnStatement,
                  argument: common.moveLocation(node, {
                    type: Syntax.SequenceExpression,
                    expressions: [node.test, common.SpecialNode.generateUndefined()]
                  })
                });
              }
              consequent = node.consequent.argument || common.SpecialNode.generateUndefined();
              alternate = node.alternate.argument || common.SpecialNode.generateUndefined();
              return common.moveLocation(node, {
                type: Syntax.ReturnStatement,
                argument: common.moveLocation(node, {
                  type: Syntax.ConditionalExpression,
                  test: node.test,
                  consequent: consequent,
                  alternate: alternate
                })
              });
            }
            if (node.consequent.type === Syntax.ThrowStatement && node.alternate.type === Syntax.ThrowStatement) {
              modified = true;
              return common.moveLocation(node, {
                type: Syntax.ThrowStatement,
                argument: common.moveLocation(node, {
                  type: Syntax.ConditionalExpression,
                  test: node.test,
                  consequent: node.consequent.argument,
                  alternate: node.alternate.argument
                })
              });
            }
          } else {
            if (node.consequent.type === Syntax.ExpressionStatement) {
              modified = true;
              return common.moveLocation(node, {
                type: Syntax.ExpressionStatement,
                expression: common.moveLocation(node, {
                  type: Syntax.LogicalExpression,
                  operator: '&&',
                  left: node.test,
                  right: node.consequent.expression
                })
              });
            } else if (node.consequent.type === Syntax.EmptyStatement) {
              modified = true;
              return common.moveLocation(node, {
                type: Syntax.ExpressionStatement,
                expression: node.test
              });
            }
          }
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformBranchToExpression.passName = Name;
  module.exports = transformBranchToExpression;
}());
