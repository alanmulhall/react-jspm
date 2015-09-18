/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'concatenate-variable-definition';
  common = require("../common");
  Syntax = common.Syntax;
  function concatenateVariableDefinition(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {leave: function leave(node) {
        var i,
            iz,
            j,
            jz,
            stmt,
            decl,
            target,
            body;
        if (node.type !== Syntax.BlockStatement && node.type !== Syntax.Program) {
          return;
        }
        target = null;
        body = [];
        for (i = 0, iz = node.body.length; i < iz; ++i) {
          stmt = node.body[i];
          if (stmt.type === Syntax.VariableDeclaration && stmt.kind === 'var') {
            if (!target) {
              target = stmt;
              body.push(stmt);
              continue;
            }
            modified = true;
            for (j = 0, jz = stmt.declarations.length; j < jz; ++j) {
              decl = stmt.declarations[j];
              target.declarations.push(decl);
            }
          } else {
            target = null;
            body.push(stmt);
          }
        }
        node.body = body;
      }});
    return {
      result: result,
      modified: modified
    };
  }
  concatenateVariableDefinition.passName = Name;
  module.exports = concatenateVariableDefinition;
}());
