/* */ 
(function() {
  'use strict';
  var common;
  common = require("./common");
  function extend(result, update) {
    var prop,
        lhs,
        rhs;
    for (prop in update) {
      if (!common.Object.has(update, prop)) {
        continue;
      }
      if (prop in result) {
        lhs = result[prop];
        rhs = update[prop];
        if (common.Object.isObject(rhs) && common.Object.isObject(lhs)) {
          result[prop] = extend(lhs, rhs);
        } else {
          result[prop] = update[prop];
        }
      } else {
        result[prop] = update[prop];
      }
    }
    return result;
  }
  function Options(override) {
    var defaults = {
      destructive: true,
      preserveCompletionValue: false
    };
    if (override == null) {
      this.data = defaults;
      return;
    }
    this.data = extend(defaults, override);
  }
  Options.prototype.get = function get(name, details) {
    var local;
    if (details != null) {
      if (common.Object.has(details, 'pathName')) {
        local = this.data[details.pathName];
        if (local != null && common.Object.has(local, name)) {
          return local[name];
        }
      }
    }
    return this.data[name];
  };
  module.exports = Options;
}());
