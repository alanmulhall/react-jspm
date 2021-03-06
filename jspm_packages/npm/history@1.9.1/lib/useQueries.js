/* */ 
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function defaultStringifyQuery(query) {
  return _qs2['default'].stringify(query, { arrayFormat: 'brackets' });
}

function defaultParseQueryString(queryString) {
  return _qs2['default'].parse(queryString);
}

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know how to handle URL queries.
 */
function useQueries(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var stringifyQuery = options.stringifyQuery;
    var parseQueryString = options.parseQueryString;

    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);

    var history = createHistory(historyOptions);

    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

    function listen(listener) {
      return history.listen(function (location) {
        if (!location.query) location.query = parseQueryString(location.search.substring(1));

        listener(location);
      });
    }

    function pushState(state, pathname, query) {
      return history.pushState(state, createPath(pathname, query));
    }

    function replaceState(state, pathname, query) {
      return history.replaceState(state, createPath(pathname, query));
    }

    function createPath(pathname, query) {
      var queryString = undefined;
      if (query == null || (queryString = stringifyQuery(query)) === '') return pathname;

      return history.createPath(pathname + (pathname.indexOf('?') === -1 ? '?' : '&') + queryString);
    }

    function createHref(pathname, query) {
      return history.createHref(createPath(pathname, query));
    }

    return _extends({}, history, {
      listen: listen,
      pushState: pushState,
      replaceState: replaceState,
      createPath: createPath,
      createHref: createHref
    });
  };
}

exports['default'] = useQueries;
module.exports = exports['default'];