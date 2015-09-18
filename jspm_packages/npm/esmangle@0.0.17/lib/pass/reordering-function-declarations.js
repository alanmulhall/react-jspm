/* */ 
(function() {
  'use strict';
  var Name,
      Syntax,
      common,
      modified;
  Name = 'reordering-function-declarations';
  common = require("../common");
  Syntax = common.Syntax;
  function reordering(array) {
    var i,
        iz,
        node,
        directives,
        declarations,
        others;
    directives = [];
    declarations = [];
    others = [];
    for (i = 0, iz = array.length; i < iz; ++i) {
      node = array[i];
      if (node.type === Syntax.FunctionDeclaration) {
        if ((declarations.length + directives.length) !== i) {
          modified = true;
        }
        declarations.push(node);
      } else if (node.type === Syntax.DirectiveStatement) {
        directives.push(node);
      } else {
        others.push(node);
      }
    }
    return directives.concat(declarations, others);
  }
  function reorderingFunctionDeclarations(tree, options) {
    var result;
    result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
    modified = false;
    common.traverse(result, {leave: function leave(node) {
        switch (node.type) {
          case Syntax.Program:
            node.body = reordering(node.body);
            break;
          case Syntax.FunctionDeclaration:
          case Syntax.FunctionExpression:
            node.body.body = reordering(node.body.body);
            break;
        }
      }});
    return {
      result: result,
      modified: modified
    };
  }
  reorderingFunctionDeclarations.passName = Name;
  module.exports = reorderingFunctionDeclarations;
}());
