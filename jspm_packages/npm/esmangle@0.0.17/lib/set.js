/* */ 
(function() {
  'use strict';
  var Set,
      Map;
  Map = require("./map");
  if (typeof global.Set !== 'undefined') {
    Set = global.Set;
  } else {
    Set = function Set() {
      this.__map = new Map();
    };
    Set.prototype.has = function SetHas(key) {
      return this.__map.has(key);
    };
    Set.prototype.add = function SetAdd(key) {
      return this.__map.set(key, true);
    };
    Set.prototype['delete'] = function SetDelete(key) {
      return this.__map['delete'](key);
    };
    Set.prototype.clear = function SetClear() {
      return this.__map.clear();
    };
    Set.prototype.forEach = function SetForEach(callback, thisArg) {
      var that = this;
      this.__map.forEach(function(value, key) {
        callback.call(thisArg, key, that);
      });
    };
    Set.prototype.values = function SetValues() {
      return this.__map.keys();
    };
    Set.prototype.keys = Set.prototype.values;
  }
  module.exports = Set;
}());
