/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'remove-wasted-blocks';
  common = require("../common");
  Syntax = common.Syntax;
  function flattenBlockStatement(body) {
    var i,
        iz,
        j,
        jz,
        result,
        stmt,
        inner,
        ok;
    result = [];
    for (i = 0, iz = body.length; i < iz; ++i) {
      stmt = body[i];
      if (stmt.type === Syntax.BlockStatement) {
        ok = true;
        for (j = 0, jz = stmt.body.length; j < jz; ++j) {
          inner = stmt.body[j];
          if (common.isScopedDeclaration(inner)) {
            ok = false;
          }
        }
        if (ok) {
          modified = true;
          result = result.concat(stmt.body);
        } else {
          result.push(stmt);
        }
      } else {
        result.push(stmt);
      }
    }
    return result;
  }
  function removeWastedBlocks(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    result = common.replace(result, {leave: function leave(node, parent) {
        var i,
            iz,
            stmt;
        if (node.type === Syntax.BlockStatement || node.type === Syntax.Program) {
          for (i = 0, iz = node.body.length; i < iz; ++i) {
            stmt = node.body[i];
            if (stmt.type === Syntax.BlockStatement) {
              node.body = flattenBlockStatement(node.body);
              break;
            }
          }
        }
        if (parent.type === Syntax.FunctionDeclaration || parent.type === Syntax.FunctionExpression || parent.type === Syntax.TryStatement || parent.type === Syntax.CatchClause) {
          return;
        }
        while (node.type === Syntax.BlockStatement && node.body.length === 1 && !common.isScopedDeclaration(node.body[0])) {
          modified = true;
          node = node.body[0];
        }
        if (node.type === Syntax.BlockStatement && node.body.length === 0) {
          modified = true;
          return {type: Syntax.EmptyStatement};
        }
        return node;
      }});
    return {
      result: result,
      modified: modified
    };
  }
  removeWastedBlocks.passName = Name;
  module.exports = removeWastedBlocks;
}());
