/* */ 
(function() {
  'use strict';
  var esshorten,
      common,
      Options,
      Syntax,
      Pass,
      annotateDirective;
  esshorten = require("esshorten");
  common = require("./common");
  Options = require("./options");
  Pass = require("./pass");
  annotateDirective = require("./annotate-directive");
  Syntax = common.Syntax;
  function recover(tree, useDirectiveStatement) {
    function trailingIf(node) {
      while (true) {
        switch (node.type) {
          case Syntax.IfStatement:
            if (!node.alternate) {
              return true;
            }
            node = node.alternate;
            continue;
          case Syntax.LabeledStatement:
          case Syntax.ForStatement:
          case Syntax.ForInStatement:
          case Syntax.WhileStatement:
          case Syntax.WithStatement:
            node = node.body;
            continue;
        }
        return false;
      }
    }
    common.traverse(tree, {leave: function leave(node) {
        if (node.type === Syntax.IfStatement && node.alternate) {
          if (node.consequent.type !== Syntax.BlockStatement) {
            if (trailingIf(node.consequent)) {
              node.consequent = {
                type: Syntax.BlockStatement,
                body: [node.consequent]
              };
            }
          }
        }
        if (!useDirectiveStatement && node.type === Syntax.DirectiveStatement) {
          node.type = Syntax.ExpressionStatement;
          node.expression = common.moveLocation(node, {
            type: Syntax.Literal,
            value: node.value,
            raw: node.raw
          });
          delete node.directive;
          delete node.value;
          delete node.raw;
        }
      }});
    return tree;
  }
  function iteration(tree, p, options) {
    var i,
        iz,
        pass,
        res,
        changed,
        statuses,
        passes,
        result;
    function addPass(pass) {
      var name;
      if (typeof pass !== 'function') {
        name = Object.keys(pass)[0];
        pass = pass[name];
      }
      if (pass.hasOwnProperty('passName')) {
        name = pass.passName;
      } else {
        name = pass.name;
      }
      passes.push(pass);
      statuses.push(true);
    }
    function fillStatuses(bool) {
      var i,
          iz;
      for (i = 0, iz = statuses.length; i < iz; ++i) {
        statuses[i] = bool;
      }
    }
    result = (options.get('destructive')) ? tree : common.deepCopy(tree);
    statuses = [];
    passes = [];
    for (i = 0, iz = p.length; i < iz; ++i) {
      addPass(p[i]);
    }
    do {
      changed = false;
      for (i = 0, iz = passes.length; i < iz; ++i) {
        pass = passes[i];
        if (statuses[i]) {
          res = pass(result, options);
          if (res.modified) {
            changed = true;
            fillStatuses(true);
          } else {
            statuses[i] = false;
          }
          result = res.result;
        }
      }
    } while (changed);
    return result;
  }
  function optimize(tree, pipeline, options) {
    var i,
        iz,
        j,
        jz,
        section,
        pass;
    tree = annotateDirective(tree, new Options({destructive: false}));
    if (null == pipeline) {
      pipeline = Pass.__defaultPipeline;
    }
    options = new Options(options);
    for (i = 0, iz = pipeline.length; i < iz; ++i) {
      section = pipeline[i];
      if (common.Array.isArray(section)) {
        tree = iteration(tree, section, options);
      } else if (section.once) {
        pass = section.pass;
        for (j = 0, jz = pass.length; j < jz; ++j) {
          tree = pass[j](tree, options).result;
        }
      }
    }
    return recover(tree, options.get('directive'));
  }
  exports.version = require("../package.json!systemjs-json").version;
  exports.mangle = esshorten.mangle;
  exports.optimize = optimize;
  exports.pass = Pass;
}());
