/* */ 
(function() {
  'use strict';
  var escope,
      estraverse,
      utility,
      version,
      assert,
      Syntax,
      Map;
  escope = require("escope");
  estraverse = require("estraverse");
  utility = require("./utility");
  Map = require("./map");
  version = require("../package.json!systemjs-json").version;
  Syntax = estraverse.Syntax;
  assert = function assert(cond, message) {
    if (!cond) {
      throw new Error(message);
    }
  };
  if (version.indexOf('-dev', version.length - 4) === -1) {
    assert = function() {};
  }
  function passAsUnique(scope, name) {
    var i,
        iz;
    if (utility.isKeyword(name) || utility.isRestrictedWord(name)) {
      return false;
    }
    if (scope.taints.has(name)) {
      return false;
    }
    for (i = 0, iz = scope.through.length; i < iz; ++i) {
      if (scope.through[i].identifier.name === name) {
        return false;
      }
    }
    return true;
  }
  function generateName(scope, tip) {
    do {
      tip = utility.generateNextName(tip);
    } while (!passAsUnique(scope, tip));
    return tip;
  }
  function run(scope) {
    var i,
        iz,
        j,
        jz,
        variable,
        name,
        def,
        ref;
    if (scope.isStatic()) {
      name = '9';
      scope.variables.sort(function(a, b) {
        if (a.tainted) {
          return 1;
        }
        if (b.tainted) {
          return -1;
        }
        return (b.identifiers.length + b.references.length) - (a.identifiers.length + a.references.length);
      });
      for (i = 0, iz = scope.variables.length; i < iz; ++i) {
        variable = scope.variables[i];
        if (variable.tainted) {
          continue;
        }
        if (variable.identifiers.length === 0) {
          continue;
        }
        name = generateName(scope, name);
        for (j = 0, jz = variable.identifiers.length; j < jz; ++j) {
          def = variable.identifiers[j];
          def.name = name;
        }
        for (j = 0, jz = variable.references.length; j < jz; ++j) {
          ref = variable.references[j];
          ref.identifier.name = name;
        }
      }
    }
  }
  function Label(node, upper) {
    this.node = node;
    this.upper = upper;
    this.users = [];
    this.names = new Map();
    this.name = null;
  }
  Label.prototype.mangle = function() {
    var tip,
        current,
        i,
        iz;
    tip = '9';
    for (current = this.upper; current; current = current.upper) {
      if (current.name !== null) {
        this.names.set(current.name, true);
      }
    }
    do {
      tip = utility.generateNextName(tip);
    } while (this.names.has(tip));
    this.name = tip;
    for (current = this.upper; current; current = current.upper) {
      current.names.set(tip, true);
    }
    this.node.label.name = tip;
    for (i = 0, iz = this.users.length; i < iz; ++i) {
      this.users[i].label.name = tip;
    }
  };
  function LabelScope(upper) {
    this.map = new Map();
    this.upper = upper;
    this.label = null;
    this.labels = [];
  }
  LabelScope.prototype.register = function register(node) {
    var name;
    assert(node.type === Syntax.LabeledStatement, 'node should be LabeledStatement');
    this.label = new Label(node, this.label);
    this.labels.push(this.label);
    name = node.label.name;
    assert(!this.map.has(name), 'duplicate label is found');
    this.map.set(name, this.label);
  };
  LabelScope.prototype.unregister = function unregister(node) {
    var name,
        ref;
    if (node.type !== Syntax.LabeledStatement) {
      return;
    }
    name = node.label.name;
    ref = this.map.get(name);
    this.map['delete'](name);
    this.label = ref.upper;
  };
  LabelScope.prototype.resolve = function resolve(node) {
    var name;
    if (node.label) {
      name = node.label.name;
      assert(this.map.has(name), 'unresolved label');
      this.map.get(name).users.push(node);
    }
  };
  LabelScope.prototype.close = function close() {
    var i,
        iz,
        label;
    this.labels.sort(function(lhs, rhs) {
      return rhs.users.length - lhs.users.length;
    });
    for (i = 0, iz = this.labels.length; i < iz; ++i) {
      label = this.labels[i];
      label.mangle();
    }
    return this.upper;
  };
  function mangleLabels(tree) {
    var labelScope;
    estraverse.traverse(tree, {
      enter: function(node) {
        if (escope.Scope.isVariableScopeRequired(node)) {
          labelScope = new LabelScope(labelScope);
          return;
        }
        switch (node.type) {
          case Syntax.LabeledStatement:
            labelScope.register(node);
            break;
          case Syntax.BreakStatement:
          case Syntax.ContinueStatement:
            labelScope.resolve(node);
            break;
        }
      },
      leave: function(node) {
        labelScope.unregister(node);
        if (escope.Scope.isVariableScopeRequired(node)) {
          labelScope = labelScope.close();
        }
      }
    });
    return tree;
  }
  function mangle(tree, options) {
    var result,
        manager,
        i,
        iz;
    if (options == null) {
      options = {destructive: true};
    }
    result = (options.destructive == null || options.destructive) ? tree : utility.deepCopy(tree);
    manager = escope.analyze(result, {directive: true});
    for (i = 0, iz = manager.scopes.length; i < iz; ++i) {
      run(manager.scopes[i]);
    }
    return mangleLabels(result);
  }
  exports.mangle = mangle;
  exports.version = version;
  exports.generateNextName = utility.generateNextName;
}());
