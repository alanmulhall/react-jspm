/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      escope,
      evaluator,
      modified;
  Name = 'remove-unreachable-branch';
  escope = require("escope");
  common = require("../common");
  evaluator = require("../evaluator");
  Syntax = common.Syntax;
  function handleIfStatement(func, node) {
    var test,
        body,
        decl;
    test = evaluator.booleanCondition(node.test);
    if (!node.alternate) {
      if (typeof test === 'boolean') {
        modified = true;
        body = [];
        if (test) {
          body.push(common.moveLocation(node.test, {
            type: Syntax.ExpressionStatement,
            expression: node.test
          }), node.consequent);
          return {
            type: Syntax.BlockStatement,
            body: body
          };
        } else {
          decl = common.delegateVariableDeclarations(node.consequent, func);
          if (decl) {
            body.push(decl);
          }
          body.push(common.moveLocation(node.test, {
            type: Syntax.ExpressionStatement,
            expression: node.test
          }));
          return {
            type: Syntax.BlockStatement,
            body: body
          };
        }
      }
    } else {
      if (typeof test === 'boolean') {
        modified = true;
        body = [];
        if (test) {
          decl = common.delegateVariableDeclarations(node.alternate, func);
          if (decl) {
            body.push(decl);
          }
          body.push(common.moveLocation(node.test, {
            type: Syntax.ExpressionStatement,
            expression: node.test
          }), node.consequent);
          return {
            type: Syntax.BlockStatement,
            body: body
          };
        } else {
          decl = common.delegateVariableDeclarations(node.consequent, func);
          if (decl) {
            body.push(decl);
          }
          body.push(common.moveLocation(node.test, {
            type: Syntax.ExpressionStatement,
            expression: node.test
          }), node.alternate);
          return {
            type: Syntax.BlockStatement,
            body: body
          };
        }
      }
    }
  }
  function handleLogicalExpression(func, node) {
    var test;
    test = evaluator.booleanCondition(node.left);
    if (typeof test === 'boolean') {
      modified = true;
      if (test) {
        if (node.operator === '&&') {
          return common.moveLocation(node, {
            type: Syntax.SequenceExpression,
            expressions: [node.left, node.right]
          });
        } else {
          return node.left;
        }
      } else {
        if (node.operator === '&&') {
          return node.left;
        } else {
          return common.moveLocation(node, {
            type: Syntax.SequenceExpression,
            expressions: [node.left, node.right]
          });
        }
      }
    }
  }
  function handleConditionalExpression(func, node) {
    var test;
    test = evaluator.booleanCondition(node.test);
    if (typeof test === 'boolean') {
      modified = true;
      if (test) {
        return common.moveLocation(node, {
          type: Syntax.SequenceExpression,
          expressions: [node.test, node.consequent]
        });
      } else {
        return common.moveLocation(node, {
          type: Syntax.SequenceExpression,
          expressions: [node.test, node.alternate]
        });
      }
    }
  }
  function removeUnreachableBranch(tree, options) {
    var result,
        stack;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    stack = [];
    result = common.replace(result, {
      enter: function enter(node) {
        var func;
        if (escope.Scope.isVariableScopeRequired(node)) {
          stack.push(node);
          return;
        }
        func = common.Array.last(stack);
        switch (node.type) {
          case Syntax.IfStatement:
            return handleIfStatement(func, node);
          case Syntax.LogicalExpression:
            return handleLogicalExpression(func, node);
          case Syntax.ConditionalExpression:
            return handleConditionalExpression(func, node);
        }
      },
      leave: function leave(node) {
        if (escope.Scope.isVariableScopeRequired(node)) {
          stack.pop();
        }
      }
    });
    return {
      result: result,
      modified: modified
    };
  }
  removeUnreachableBranch.passName = Name;
  module.exports = removeUnreachableBranch;
}());
