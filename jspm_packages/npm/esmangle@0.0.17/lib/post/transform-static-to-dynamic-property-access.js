/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common;
  Name = 'transform-static-to-dynamic-property-access';
  common = require("../common");
  Syntax = common.Syntax;
  function transformStaticToDynamicPropertyAccess(tree, options) {
    var result,
        modified;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {enter: function enter(node) {
        var property;
        if (node.type !== Syntax.MemberExpression || node.computed || node.property.type !== Syntax.Identifier) {
          return;
        }
        property = node.property;
        switch (property.name) {
          case 'undefined':
            modified = true;
            node.computed = true;
            node.property = common.moveLocation(property, {
              type: Syntax.UnaryExpression,
              operator: 'void',
              argument: {
                type: Syntax.Literal,
                value: 0
              }
            });
            break;
          case 'true':
          case 'false':
            modified = true;
            node.computed = true;
            node.property = common.moveLocation(property, {
              type: Syntax.Literal,
              value: property.name === 'true'
            });
            break;
          case 'Infinity':
            modified = true;
            node.computed = true;
            node.property = common.moveLocation(property, {
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
            break;
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformStaticToDynamicPropertyAccess.passName = Name;
  module.exports = transformStaticToDynamicPropertyAccess;
}());
