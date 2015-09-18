/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      escope,
      modified;
  Name = 'transform-to-compound-assignment';
  escope = require("escope");
  common = require("../common");
  Syntax = common.Syntax;
  function equals(lhs, rhs) {
    if (lhs.type !== rhs.type) {
      return false;
    }
    if (lhs.type === Syntax.Identifier) {
      return lhs.name === rhs.name;
    }
    return false;
  }
  function compound(operator) {
    switch (operator) {
      case '*':
      case '/':
      case '%':
      case '+':
      case '-':
      case '<<':
      case '>>':
      case '>>>':
      case '&':
      case '^':
      case '|':
        return operator + '=';
    }
    return null;
  }
  function observableCompound(operator) {
    switch (operator) {
      case '*=':
      case '/=':
      case '%=':
      case '+=':
      case '-=':
      case '<<=':
      case '>>=':
      case '>>>=':
      case '&=':
      case '^=':
      case '|=':
        return operator;
    }
    return null;
  }
  function transformToCompoundAssignment(tree, options) {
    var result,
        scope,
        manager;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    scope = null;
    manager = escope.analyze(result, {directive: true});
    manager.attach();
    common.traverse(result, {
      enter: function enter(node) {
        var left,
            right,
            operator,
            ref;
        scope = manager.acquire(node) || scope;
        if (node.type === Syntax.AssignmentExpression && node.operator === '=') {
          left = node.left;
          right = node.right;
          if (right.type === Syntax.BinaryExpression && equals(right.left, left)) {
            operator = compound(right.operator);
            if (operator) {
              modified = true;
              node.operator = operator;
              node.right = right.right;
            }
          } else if (right.type === Syntax.AssignmentExpression && equals(right.left, left)) {
            if (observableCompound(right.operator)) {
              ref = scope.resolve(node.left);
              if (ref.isStatic()) {
                modified = true;
                node.operator = right.operator;
                node.right = right.right;
              }
            }
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
  transformToCompoundAssignment.passName = Name;
  module.exports = transformToCompoundAssignment;
}());
