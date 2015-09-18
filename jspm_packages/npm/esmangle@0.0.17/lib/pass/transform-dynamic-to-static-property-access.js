/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'transform-dynamic-to-static-property-access';
  common = require("../common");
  Syntax = common.Syntax;
  function transformDynamicToStaticPropertyAccess(tree, options) {
    var result;
    modified = false;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    common.traverse(result, {enter: function enter(node) {
        var property;
        if (node.type === Syntax.MemberExpression && node.computed) {
          property = node.property;
          if (property.type === Syntax.Literal && typeof property.value === 'string') {
            if (common.isIdentifier(property.value)) {
              modified = true;
              node.computed = false;
              node.property = common.moveLocation(property, {
                type: Syntax.Identifier,
                name: property.value
              });
            } else if (property.value === Number(property.value).toString()) {
              modified = true;
              node.computed = true;
              node.property = common.moveLocation(node.property, common.SpecialNode.generateFromValue(Number(node.property.value)));
            }
          }
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformDynamicToStaticPropertyAccess.passName = Name;
  module.exports = transformDynamicToStaticPropertyAccess;
}());
