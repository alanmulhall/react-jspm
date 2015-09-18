/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'transform-immediate-function-call';
  common = require("../common");
  Syntax = common.Syntax;
  function isEmptyFunctionCall(call) {
    var callee,
        i,
        iz,
        stmt;
    if (call.type !== Syntax.CallExpression) {
      return false;
    }
    callee = call.callee;
    if (callee.type !== Syntax.FunctionExpression) {
      return false;
    }
    if (callee.body.type !== Syntax.BlockStatement) {
      return false;
    }
    if (callee.body.body.length === 0) {
      return true;
    }
    for (i = 0, iz = callee.body.body.length; i < iz; ++i) {
      stmt = callee.body.body[i];
      if (stmt.type !== Syntax.FunctionDeclaration) {
        return false;
      }
    }
    return true;
  }
  function callToSequence(call) {
    var expressions;
    expressions = common.Array.from(call['arguments']);
    if (expressions.length === 0) {
      return common.SpecialNode.generateUndefined(call);
    }
    expressions.push(common.SpecialNode.generateUndefined());
    return common.moveLocation(call, {
      type: Syntax.SequenceExpression,
      expressions: expressions
    });
  }
  function transformImmediateFunctionCall(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    result = common.replace(result, {leave: function leave(node) {
        if (isEmptyFunctionCall(node)) {
          modified = true;
          return callToSequence(node);
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformImmediateFunctionCall.passName = Name;
  module.exports = transformImmediateFunctionCall;
}());
