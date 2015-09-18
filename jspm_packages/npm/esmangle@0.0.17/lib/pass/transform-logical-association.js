/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'transform-logical-association';
  common = require("../common");
  Syntax = common.Syntax;
  function transformLogicalAssociation(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {enter: function enter(node) {
        if (node.type === Syntax.LogicalExpression) {
          if (node.right.type === Syntax.LogicalExpression && node.operator === node.right.operator) {
            modified = true;
            node.left = {
              type: Syntax.LogicalExpression,
              operator: node.operator,
              left: node.left,
              right: node.right.left
            };
            node.right = node.right.right;
          }
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformLogicalAssociation.passName = Name;
  module.exports = transformLogicalAssociation;
}());
