/* */ 
(function() {
  'use strict';
  var query,
      Registry,
      pass,
      post,
      common;
  common = require("./common");
  query = require("./query");
  Registry = {};
  Registry.__direct = {};
  function initialize(kind, passes) {
    var i,
        iz,
        pass;
    Registry[kind] = {};
    for (i = 0, iz = passes.length; i < iz; ++i) {
      pass = passes[i];
      common.assert(Registry[kind][pass.passName] == null, 'don\'t create duplicate pass names');
      Registry[kind][pass.passName] = pass;
    }
    common.assert(Registry.__direct[pass.passName] == null, 'don\'t create duplicate pass names');
    Registry.__direct[pass.passName] = pass;
  }
  pass = [require("./pass/hoist-variable-to-arguments"), require("./pass/transform-dynamic-to-static-property-access"), require("./pass/transform-dynamic-to-static-property-definition"), require("./pass/transform-immediate-function-call"), require("./pass/transform-logical-association"), require("./pass/reordering-function-declarations"), require("./pass/remove-unused-label"), require("./pass/remove-empty-statement"), require("./pass/remove-wasted-blocks"), require("./pass/transform-to-compound-assignment"), require("./pass/transform-to-sequence-expression"), require("./pass/transform-branch-to-expression"), require("./pass/transform-typeof-undefined"), require("./pass/reduce-sequence-expression"), require("./pass/reduce-branch-jump"), require("./pass/reduce-multiple-if-statements"), require("./pass/dead-code-elimination"), require("./pass/remove-side-effect-free-expressions"), require("./pass/remove-context-sensitive-expressions"), require("./pass/tree-based-constant-folding"), require("./pass/concatenate-variable-definition"), require("./pass/drop-variable-definition"), require("./pass/remove-unreachable-branch"), require("./pass/eliminate-duplicate-function-declarations")];
  post = [require("./post/transform-static-to-dynamic-property-access"), require("./post/transform-infinity"), require("./post/rewrite-boolean"), require("./post/rewrite-conditional-expression"), require("./post/omit-parens-in-void-context-iife")];
  initialize('pass', pass);
  initialize('post', post);
  function passRequire(name) {
    if (common.Object.has(Registry.__direct, name)) {
      return Registry.__direct[name];
    }
    return query.get(Registry, name.split('/'));
  }
  exports.require = passRequire;
  exports.Registry = Registry;
  exports.__defaultPipeline = [pass, {
    once: true,
    pass: post
  }];
}());
