/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      evaluator,
      modified;
  Name = 'tree-based-constant-folding';
  common = require("../common");
  evaluator = require("../evaluator");
  Syntax = common.Syntax;
  function isModifiedConstant(node) {
    if (common.SpecialNode.isUndefined(node)) {
      return false;
    }
    if (common.SpecialNode.isNegative(node)) {
      return false;
    }
    if (common.SpecialNode.isNaN(node)) {
      return false;
    }
    return evaluator.constant.isConstant(node, false);
  }
  function isFoldableConditional(node) {
    if (node.type !== Syntax.ConditionalExpression) {
      return false;
    }
    return evaluator.constant.isConstant(node.consequent) || evaluator.constant.isConstant(node.alternate);
  }
  function foldConditional(node) {
    var binary,
        unary,
        operator,
        left,
        right;
    switch (node.type) {
      case Syntax.BinaryExpression:
        if (node.operator === 'in' || node.operator === 'instanceof') {
          return node;
        }
        if (evaluator.constant.isConstant(node.left) && isFoldableConditional(node.right)) {
          modified = true;
          binary = node;
          operator = binary.operator;
          left = evaluator.constant.evaluate(binary.left);
          node = node.right;
          if (evaluator.constant.isConstant(node.consequent)) {
            node.consequent = common.SpecialNode.generateFromValue(evaluator.constant.doBinary(operator, left, evaluator.constant.evaluate(node.consequent)));
          } else {
            binary.right = node.consequent;
            node.consequent = binary;
          }
          if (evaluator.constant.isConstant(node.alternate)) {
            node.alternate = common.SpecialNode.generateFromValue(evaluator.constant.doBinary(operator, left, evaluator.constant.evaluate(node.alternate)));
          } else {
            binary.right = node.alternate;
            node.alternate = binary;
          }
        } else if (evaluator.constant.isConstant(node.right) && isFoldableConditional(node.left)) {
          modified = true;
          binary = node;
          operator = binary.operator;
          right = evaluator.constant.evaluate(binary.right);
          node = node.left;
          if (evaluator.constant.isConstant(node.consequent)) {
            node.consequent = common.SpecialNode.generateFromValue(evaluator.constant.doBinary(operator, evaluator.constant.evaluate(node.consequent), right));
          } else {
            binary.left = node.consequent;
            node.consequent = binary;
          }
          if (evaluator.constant.isConstant(node.alternate)) {
            node.alternate = common.SpecialNode.generateFromValue(evaluator.constant.doBinary(operator, evaluator.constant.evaluate(node.alternate), right));
          } else {
            binary.left = node.alternate;
            node.alternate = binary;
          }
        }
        break;
      case Syntax.LogicalExpression:
        break;
      case Syntax.UnaryExpression:
        if (isFoldableConditional(node.argument)) {
          modified = true;
          unary = node;
          operator = unary.operator;
          node = unary.argument;
          if (evaluator.constant.isConstant(node.consequent)) {
            node.consequent = common.SpecialNode.generateFromValue(evaluator.constant.doUnary(operator, evaluator.constant.evaluate(node.consequent)));
          } else {
            unary.argument = node.consequent;
            node.consequent = unary;
          }
          if (evaluator.constant.isConstant(node.alternate)) {
            node.alternate = common.SpecialNode.generateFromValue(evaluator.constant.doUnary(operator, evaluator.constant.evaluate(node.alternate)));
          } else {
            unary.argument = node.alternate;
            node.alternate = unary;
          }
        }
        break;
    }
    return node;
  }
  function treeBasedConstantFolding(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    result = common.replace(result, {leave: function leave(node) {
        var con,
            alt;
        switch (node.type) {
          case Syntax.BinaryExpression:
          case Syntax.LogicalExpression:
          case Syntax.UnaryExpression:
            if (isModifiedConstant(node)) {
              modified = true;
              return common.moveLocation(node, common.SpecialNode.generateFromValue(evaluator.constant.evaluate(node)));
            }
            return foldConditional(node);
          case Syntax.ConditionalExpression:
            if (evaluator.constant.isConstant(node.consequent) && evaluator.constant.isConstant(node.alternate)) {
              con = evaluator.constant.evaluate(node.consequent);
              alt = evaluator.constant.evaluate(node.alternate);
              if (common.sameValue(con, alt)) {
                modified = true;
                return common.moveLocation(node, {
                  type: Syntax.SequenceExpression,
                  expressions: [node.test, common.SpecialNode.generateFromValue(con)]
                });
              }
            }
            break;
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  treeBasedConstantFolding.passName = Name;
  module.exports = treeBasedConstantFolding;
}());
