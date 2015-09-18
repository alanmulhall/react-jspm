/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'rewrite-conditional-expression';
  common = require("../common");
  Syntax = common.Syntax;
  function rewrite(node) {
    var test,
        consequent,
        alternate;
    test = node.test;
    consequent = node.consequent;
    alternate = node.alternate;
    if (test.type === Syntax.UnaryExpression && test.operator === '!') {
      modified = true;
      node.consequent = alternate;
      node.alternate = consequent;
      node.test = test.argument;
    }
  }
  function rewriteConditionalExpression(tree, options) {
    var result;
    modified = false;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    common.traverse(result, {enter: function enter(node) {
        if (node.type === Syntax.ConditionalExpression) {
          rewrite(node);
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  rewriteConditionalExpression.passName = Name;
  module.exports = rewriteConditionalExpression;
}());
