/* */ 
'use strict';
exports.__esModule = true;
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
exports['default'] = match;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _historyLibCreateMemoryHistory = require("history/lib/createMemoryHistory");
var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
var _useRoutes = require("./useRoutes");
var _useRoutes2 = _interopRequireDefault(_useRoutes);
var _RouteUtils = require("./RouteUtils");
function match(_ref, cb) {
  var routes = _ref.routes;
  var history = _ref.history;
  var location = _ref.location;
  var parseQueryString = _ref.parseQueryString;
  var stringifyQuery = _ref.stringifyQuery;
  var createHistory = history ? function() {
    return history;
  } : _historyLibCreateMemoryHistory2['default'];
  var staticHistory = _useRoutes2['default'](createHistory)({
    routes: _RouteUtils.createRoutes(routes),
    parseQueryString: parseQueryString,
    stringifyQuery: stringifyQuery
  });
  staticHistory.match(location, function(error, nextLocation, nextState) {
    var renderProps = nextState ? _extends({}, nextState, {history: staticHistory}) : null;
    cb(error, nextLocation, renderProps);
  });
}
module.exports = exports['default'];
