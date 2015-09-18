/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common;
  Name = 'transform-infinity';
  common = require("../common");
  Syntax = common.Syntax;
  function transformInfinity(tree, options) {
    var result,
        modified;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    result = common.replace(result, {enter: function enter(node) {
        if (node.type === Syntax.Literal && typeof node.value === 'number') {
          if (node.value === Infinity) {
            modified = true;
            return common.moveLocation(node, {
              type: Syntax.BinaryExpression,
              operator: '/',
              left: {
                type: Syntax.Literal,
                value: 1
              },
              right: {
                type: Syntax.Literal,
                value: 0
              }
            });
          }
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformInfinity.passName = Name;
  module.exports = transformInfinity;
}());
