/* */ 
'use strict';
exports.__esModule = true;
var _PatternUtils = require("./PatternUtils");
function pathnameIsActive(pathname, activePathname, activeRoutes, activeParams) {
  if (pathname === activePathname || activePathname.indexOf(pathname + '/') === 0)
    return true;
  var route,
      pattern;
  var basename = '';
  for (var i = 0,
      len = activeRoutes.length; i < len; ++i) {
    route = activeRoutes[i];
    if (!route.path)
      return false;
    pattern = route.path || '';
    if (pattern.indexOf('/') !== 0)
      pattern = basename.replace(/\/*$/, '/') + pattern;
    var _matchPattern = _PatternUtils.matchPattern(pattern, pathname);
    var remainingPathname = _matchPattern.remainingPathname;
    var paramNames = _matchPattern.paramNames;
    var paramValues = _matchPattern.paramValues;
    if (remainingPathname === '') {
      return paramNames.every(function(paramName, index) {
        return String(paramValues[index]) === String(activeParams[paramName]);
      });
    }
    basename = pattern;
  }
  return false;
}
function queryIsActive(query, activeQuery) {
  if (activeQuery == null)
    return query == null;
  if (query == null)
    return true;
  for (var p in query)
    if (query.hasOwnProperty(p) && String(query[p]) !== String(activeQuery[p]))
      return false;
  return true;
}
function isActive(pathname, query, indexOnly, location, routes, params) {
  if (location == null)
    return false;
  if (indexOnly && (routes.length < 2 || routes[routes.length - 2].indexRoute !== routes[routes.length - 1]))
    return false;
  return pathnameIsActive(pathname, location.pathname, routes, params) && queryIsActive(query, location.query);
}
exports['default'] = isActive;
module.exports = exports['default'];
