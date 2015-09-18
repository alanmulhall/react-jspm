/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      evaluator,
      escope,
      modified;
  Name = 'reduce-sequence-expression';
  escope = require("escope");
  common = require("../common");
  evaluator = require("../evaluator");
  Syntax = common.Syntax;
  function reduce(node) {
    var i,
        iz,
        j,
        jz,
        expr,
        result;
    result = [];
    for (i = 0, iz = node.expressions.length; i < iz; ++i) {
      expr = node.expressions[i];
      if (expr.type === Syntax.SequenceExpression) {
        modified = true;
        common.deleteLocation(node);
        for (j = 0, jz = expr.expressions.length; j < jz; ++j) {
          result.push(expr.expressions[j]);
        }
      } else {
        result.push(expr);
      }
    }
    node.expressions = result;
  }
  function isLoadSideEffectFree(node, scope) {
    var ref,
        value;
    if (evaluator.constant.isConstant(node)) {
      value = evaluator.constant.evaluate(node);
      if (value === null || typeof value !== 'object') {
        return true;
      }
    }
    if (node.type === Syntax.Identifier) {
      ref = scope.resolve(node);
      return ref && ref.isStatic();
    }
    return false;
  }
  function isStoreSideEffectFree(node, scope) {
    if (!evaluator.hasSideEffect(node, scope)) {
      return true;
    }
    if (node.type === Syntax.Identifier) {
      return true;
    }
    if (node.type === Syntax.MemberExpression) {
      if (!evaluator.hasSideEffect(node.object, scope)) {
        if (!node.computed || isLoadSideEffectFree(node.property, scope)) {
          return true;
        }
      }
      return false;
    }
    return false;
  }
  function reduceSequenceExpression(tree, options) {
    var result,
        scope,
        manager;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    scope = null;
    manager = escope.analyze(result, {directive: true});
    manager.attach();
    result = common.replace(result, {
      enter: function enter(node) {
        scope = manager.acquire(node) || scope;
      },
      leave: function leave(node) {
        var result,
            last;
        switch (node.type) {
          case Syntax.SequenceExpression:
            reduce(node);
            break;
          case Syntax.ConditionalExpression:
            if (node.test.type === Syntax.SequenceExpression) {
              modified = true;
              result = node.test;
              node.test = common.Array.last(result.expressions);
              result.expressions[result.expressions.length - 1] = node;
            }
            break;
          case Syntax.LogicalExpression:
            if (node.left.type === Syntax.SequenceExpression) {
              modified = true;
              result = node.left;
              node.left = common.Array.last(result.expressions);
              result.expressions[result.expressions.length - 1] = node;
            }
            break;
          case Syntax.BinaryExpression:
            if (node.left.type === Syntax.SequenceExpression) {
              modified = true;
              result = node.left;
              node.left = common.Array.last(result.expressions);
              result.expressions[result.expressions.length - 1] = node;
            } else if (node.right.type === Syntax.SequenceExpression && !evaluator.hasSideEffect(node.left, scope)) {
              modified = true;
              result = node.right;
              node.right = common.Array.last(result.expressions);
              result.expressions[result.expressions.length - 1] = node;
            }
            break;
          case Syntax.UpdateExpression:
          case Syntax.UnaryExpression:
            if (node.argument.type === Syntax.SequenceExpression) {
              last = common.Array.last(node.argument.expressions);
              if (!common.SpecialNode.canExtractSequence(last, node, scope)) {
                break;
              }
              modified = true;
              result = node.argument;
              node.argument = common.Array.last(result.expressions);
              result.expressions[result.expressions.length - 1] = node;
            }
            break;
          case Syntax.AssignmentExpression:
            if (node.operator === '=' && node.right.type === Syntax.SequenceExpression && isStoreSideEffectFree(node.left, scope)) {
              modified = true;
              result = node.right;
              node.right = common.Array.last(result.expressions);
              result.expressions[result.expressions.length - 1] = node;
            }
            break;
        }
        scope = manager.release(node) || scope;
        return result;
      }
    });
    manager.detach();
    return {
      result: result,
      modified: modified
    };
  }
  reduceSequenceExpression.passName = Name;
  module.exports = reduceSequenceExpression;
}());
