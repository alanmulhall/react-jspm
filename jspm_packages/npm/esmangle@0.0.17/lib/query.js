/* */ 
(function() {
  'use strict';
  var common;
  common = require("./common");
  exports.get = function get(root, query) {
    var i,
        iz,
        name,
        node;
    node = root;
    for (i = 0, iz = query.length; i < iz; ++i) {
      name = query[i];
      node = node[name];
    }
    return node;
  };
  exports.set = function set(root, query, value) {
    var i,
        iz,
        name,
        node;
    common.assert(query.length > 0);
    node = root;
    for (i = 0, iz = query.length - 1; i < iz; ++i) {
      name = query[i];
      node = node[name];
    }
    name = query[i];
    node[name] = value;
  };
}());
