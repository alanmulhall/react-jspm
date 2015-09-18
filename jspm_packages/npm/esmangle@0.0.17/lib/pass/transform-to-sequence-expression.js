/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'transform-to-sequence-expression';
  common = require("../common");
  Syntax = common.Syntax;
  function transform(node) {
    var i,
        iz,
        expressions,
        stmt,
        prev,
        body;
    function constructSeq(expressions, stmt) {
      var seq;
      if (expressions.length !== 1) {
        modified = true;
        seq = {
          type: Syntax.SequenceExpression,
          expressions: expressions
        };
        if (stmt.type === Syntax.ExpressionStatement) {
          stmt.expression = seq;
        } else {
          stmt.argument = seq;
        }
      }
      return stmt;
    }
    body = [];
    expressions = [];
    for (i = 0, iz = node.body.length; i < iz; ++i) {
      prev = stmt;
      stmt = node.body[i];
      if (stmt.type === Syntax.ExpressionStatement) {
        expressions.push(stmt.expression);
      } else if ((stmt.type === Syntax.ReturnStatement && stmt.argument != null) || stmt.type === Syntax.ThrowStatement) {
        expressions.push(stmt.argument);
        body.push(constructSeq(expressions, stmt));
        expressions = [];
      } else if (stmt.type === Syntax.ForStatement && (!stmt.init || stmt.init.type !== Syntax.VariableDeclaration)) {
        if (expressions.length) {
          modified = true;
          if (stmt.init) {
            expressions.push(stmt.init);
          }
          if (expressions.length === 1) {
            stmt.init = expressions[0];
          } else {
            stmt.init = {
              type: Syntax.SequenceExpression,
              expressions: expressions
            };
          }
          expressions = [];
        }
        body.push(stmt);
      } else if (stmt.type === Syntax.IfStatement) {
        if (expressions.length) {
          modified = true;
          expressions.push(stmt.test);
          stmt.test = {
            type: Syntax.SequenceExpression,
            expressions: expressions
          };
          expressions = [];
        }
        body.push(stmt);
      } else {
        if (expressions.length) {
          body.push(constructSeq(expressions, prev));
          expressions = [];
        }
        body.push(stmt);
      }
    }
    if (expressions.length) {
      body.push(constructSeq(expressions, stmt));
    }
    node.body = body;
  }
  function transformToSequenceExpression(tree, options) {
    var result;
    modified = false;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    common.traverse(result, {enter: function enter(node) {
        switch (node.type) {
          case Syntax.BlockStatement:
          case Syntax.Program:
            transform(node);
            break;
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  transformToSequenceExpression.passName = Name;
  module.exports = transformToSequenceExpression;
}());
