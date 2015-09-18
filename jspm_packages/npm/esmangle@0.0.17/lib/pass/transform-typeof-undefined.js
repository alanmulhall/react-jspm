/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      escope,
      modified;
  Name = 'transform-typeof-undefined';
  escope = require("escope");
  common = require("../common");
  Syntax = common.Syntax;
  function isUndefinedStringLiteral(node) {
    return node.type === Syntax.Literal && node.value === 'undefined';
  }
  function transformTypeofUndefined(tree, options) {
    var result,
        manager,
        scope;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    scope = null;
    manager = escope.analyze(result, {directive: true});
    manager.attach();
    common.traverse(result, {
      enter: function enter(node) {
        var target,
            undef,
            argument,
            ref;
        scope = manager.acquire(node) || scope;
        if (node.type === Syntax.BinaryExpression && (node.operator === '===' || node.operator === '!==' || node.operator === '==' || node.operator === '!=')) {
          if (isUndefinedStringLiteral(node.left)) {
            undef = 'left';
            target = 'right';
          } else if (isUndefinedStringLiteral(node.right)) {
            undef = 'right';
            target = 'left';
          } else {
            return;
          }
          if (node[target].type === Syntax.UnaryExpression && node[target].operator === 'typeof') {
            argument = node[target].argument;
            if (argument.type === Syntax.Identifier) {
              ref = scope.resolve(argument);
              if (!ref || !ref.isStatic() || !ref.resolved) {
                return;
              }
            }
            modified = true;
            node[undef] = common.SpecialNode.generateUndefined();
            node[target] = argument;
            node.operator = node.operator.charAt(0) === '!' ? '!==' : '===';
          }
        }
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
  transformTypeofUndefined.passName = Name;
  module.exports = transformTypeofUndefined;
}());
