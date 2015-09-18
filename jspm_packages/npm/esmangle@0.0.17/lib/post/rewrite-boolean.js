/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'rewrite-boolean';
  common = require("../common");
  Syntax = common.Syntax;
  function isBooleanLiteral(node) {
    return node.type === Syntax.Literal && typeof node.value === 'boolean';
  }
  function rewrite(node) {
    if (isBooleanLiteral(node)) {
      modified = true;
      return common.moveLocation(node, {
        type: Syntax.UnaryExpression,
        operator: '!',
        argument: common.moveLocation(node, {
          type: Syntax.Literal,
          value: +!node.value
        })
      });
    }
    if (node.type === Syntax.BinaryExpression && node.operator === '==' || node.operator === '!=') {
      if (isBooleanLiteral(node.left)) {
        modified = true;
        node.left = common.moveLocation(node.left, {
          type: Syntax.Literal,
          value: +node.left.value
        });
        return node;
      }
      if (isBooleanLiteral(node.right)) {
        modified = true;
        node.right = common.moveLocation(node.right, {
          type: Syntax.Literal,
          value: +node.right.value
        });
        return node;
      }
    }
    return node;
  }
  function rewriteBoolean(tree, options) {
    var result;
    modified = false;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    result = common.replace(result, {enter: rewrite});
    return {
      result: result,
      modified: modified
    };
  }
  rewriteBoolean.passName = Name;
  module.exports = rewriteBoolean;
}());
