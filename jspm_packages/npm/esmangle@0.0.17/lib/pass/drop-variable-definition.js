/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified,
      escope,
      evaluator;
  Name = 'drop-variable-definition';
  common = require("../common");
  escope = require("escope");
  evaluator = require("../evaluator");
  Syntax = common.Syntax;
  function getCandidates(scope) {
    var i,
        iz,
        j,
        jz,
        identifiers,
        slots,
        v;
    if (!scope.candidates) {
      slots = [];
      identifiers = [];
      for (i = 0, iz = scope.variables.length; i < iz; ++i) {
        v = scope.variables[i];
        for (j = 0, jz = v.identifiers.length; j < jz; ++j) {
          identifiers.push(v.identifiers[j]);
          slots.push(v);
        }
      }
      scope.candidates = {
        slots: slots,
        identifiers: identifiers
      };
    }
    return scope.candidates;
  }
  function isRemovableDefinition(slot) {
    var i,
        iz,
        ref,
        parent;
    if (slot.identifiers.length !== 1) {
      return false;
    }
    if (slot.references.length === 0) {
      return true;
    }
    for (i = 0, iz = slot.references.length; i < iz; ++i) {
      ref = slot.references[i];
      if (ref.isRead()) {
        return false;
      }
      if (ref.isWrite()) {
        if (!ref.writeExpr) {
          return false;
        }
        parent = ref.writeExpr.__$parent$__;
        if (!parent) {
          return false;
        }
        if (parent.type !== Syntax.AssignmentExpression && parent.type !== Syntax.VariableDeclarator) {
          return false;
        }
        if (evaluator.hasSideEffect(ref.writeExpr, ref.from)) {
          return false;
        }
      }
    }
    return true;
  }
  function overrideExpression(from, to) {
    var key;
    for (key in from) {
      delete from[key];
    }
    for (key in to) {
      from[key] = to[key];
    }
    return from;
  }
  function removeDefinition(node, index, slot) {
    var i,
        iz,
        ref,
        parent;
    node.declarations.splice(index, 1);
    for (i = 0, iz = slot.references.length; i < iz; ++i) {
      ref = slot.references[i];
      common.assert(!ref.isRead());
      if (ref.isWrite()) {
        parent = ref.writeExpr.__$parent$__;
        if (parent.type === Syntax.AssignmentExpression) {
          overrideExpression(ref.writeExpr.__$parent$__, ref.writeExpr);
        }
      }
    }
  }
  function attachParent(tree) {
    return common.traverse(tree, {enter: function(node, parent) {
        node.__$parent$__ = parent;
      }});
  }
  function removeParent(tree) {
    return common.traverse(tree, {enter: function(node) {
        delete node.__$parent$__;
        delete node.__$escope$__;
      }});
  }
  function dropVariableDefinition(tree, options) {
    var result,
        manager,
        scope;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    scope = null;
    manager = escope.analyze(result, {directive: true});
    manager.attach();
    attachParent(result);
    result = common.replace(result, {
      enter: function enter(node, parent) {
        var i,
            decl,
            cand,
            index,
            slot,
            ret;
        ret = node;
        if (scope) {
          if (scope.variableScope.isStatic()) {
            cand = getCandidates(scope.variableScope);
            if (node.type === Syntax.VariableDeclaration && node.kind === 'var') {
              i = node.declarations.length;
              while (i--) {
                decl = node.declarations[i];
                index = cand.identifiers.indexOf(decl.id);
                if (index !== -1) {
                  slot = cand.slots[index];
                  if (isRemovableDefinition(slot)) {
                    modified = true;
                    removeDefinition(node, i, slot);
                    continue;
                  }
                }
              }
              if (node.declarations.length === 0) {
                if (parent.type === Syntax.ForStatement) {
                  ret = null;
                } else {
                  ret = common.moveLocation(node, {type: Syntax.EmptyStatement});
                }
              }
            }
            if (node.type === Syntax.FunctionDeclaration) {
              index = cand.identifiers.indexOf(node.id);
              if (index !== -1) {
                slot = cand.slots[index];
                if (slot.identifiers.length === 1 && slot.references.length === 0) {
                  modified = true;
                  ret = common.moveLocation(node, {type: Syntax.EmptyStatement});
                  return ret;
                }
              }
            }
          }
        }
        scope = manager.acquire(node) || scope;
        return ret;
      },
      leave: function leave(node) {
        scope = manager.release(node) || scope;
      }
    });
    manager.detach();
    removeParent(result);
    return {
      result: result,
      modified: modified
    };
  }
  dropVariableDefinition.passName = Name;
  module.exports = dropVariableDefinition;
}());
