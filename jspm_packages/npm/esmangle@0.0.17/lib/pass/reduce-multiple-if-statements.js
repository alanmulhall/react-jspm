/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'reduce-multiple-if-statements';
  common = require("../common");
  Syntax = common.Syntax;
  function reduceMultipleIfStatements(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {leave: function leave(node) {
        if (node.type === Syntax.IfStatement && !node.alternate && node.consequent.type === Syntax.IfStatement && !node.consequent.alternate) {
          modified = true;
          node.test = {
            type: Syntax.LogicalExpression,
            operator: '&&',
            left: node.test,
            right: node.consequent.test
          };
          node.consequent = node.consequent.consequent;
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  reduceMultipleIfStatements.passName = Name;
  module.exports = reduceMultipleIfStatements;
}());
