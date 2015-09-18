/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      escope,
      evaluator,
      modified;
  Name = 'remove-side-effect-free-expressions';
  escope = require("escope");
  common = require("../common");
  evaluator = require("../evaluator");
  Syntax = common.Syntax;
  function reduce(node, scope, parent, isResultNeeded) {
    var i,
        iz,
        expr,
        result,
        prev;
    common.assert(node.expressions.length > 1, 'expressions should be more than one');
    result = [];
    for (i = 0, iz = node.expressions.length; i < iz; ++i) {
      prev = expr;
      expr = node.expressions[i];
      if (((i + 1) !== iz) || !isResultNeeded) {
        if (!evaluator.hasSideEffect(expr, scope)) {
          continue;
        }
      }
      result.push(expr);
    }
    if (!isResultNeeded && result.length === 0) {
      modified = true;
      return expr;
    }
    common.assert(result.length > 0, 'result should be more than zero');
    do {
      if (iz === result.length) {
        return node;
      }
      if (result.length === 1) {
        if (!common.SpecialNode.canExtractSequence(result[0], parent, scope)) {
          result.unshift(prev);
          continue;
        }
        modified = true;
        return result[0];
      }
      modified = true;
      node.expressions = result;
      return node;
    } while (true);
  }
  function removeSideEffectFreeExpressions(tree, options) {
    var result,
        scope,
        manager,
        preserveCompletionValue;
    function isResultNeeded(parent, scope) {
      if (parent.type === Syntax.ExpressionStatement && (!preserveCompletionValue || scope.type !== 'global')) {
        return false;
      }
      return true;
    }
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    preserveCompletionValue = options.get('preserveCompletionValue', {pathName: Name});
    modified = false;
    scope = null;
    manager = escope.analyze(result, {directive: true});
    manager.attach();
    result = common.replace(result, {
      enter: function enter(node, parent) {
        var res;
        res = node;
        scope = manager.acquire(node) || scope;
        if (res.type === Syntax.SequenceExpression) {
          res = reduce(res, scope, parent, isResultNeeded(parent, scope));
        }
        if (!isResultNeeded(res, scope)) {
          if (!evaluator.hasSideEffect(res.expression, scope)) {
            modified = true;
            res = common.moveLocation(res, {type: Syntax.EmptyStatement});
          }
        }
        return res;
      },
      leave: function leave(node) {
        scope = manager.release(node) || scope;
      }
    });
    manager.detach();
    return {
      result: result,
      modified: modified
    };
  }
  removeSideEffectFreeExpressions.passName = Name;
  module.exports = removeSideEffectFreeExpressions;
}());
