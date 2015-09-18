/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'transform-dynamic-to-static-property-definition';
  common = require("../common");
  Syntax = common.Syntax;
  function transformDynamicToStaticPropertyDefinition(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {enter: function enter(node) {
        var generated;
        if (node.type === Syntax.Property) {
          if (node.key.type === Syntax.Literal && typeof node.key.value === 'string') {
            if (common.isIdentifier(node.key.value)) {
              modified = true;
              node.key = common.moveLocation(node.key, {
                type: Syntax.Identifier,
                name: node.key.value
              });
            } else if (node.key.value === Number(node.key.value).toString()) {
              generated = common.SpecialNode.generateFromValue(Number(node.key.value));
              if (generated.type === Syntax.Literal) {
                modified = true;
                node.key = common.moveLocation(node.key, generated);
              }
            }
          }
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformDynamicToStaticPropertyDefinition.passName = Name;
  module.exports = transformDynamicToStaticPropertyDefinition;
}());
