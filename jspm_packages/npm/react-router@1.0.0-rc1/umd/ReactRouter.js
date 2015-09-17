/* */ 
"format cjs";
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require("../../../../../node_modules/react/react"));
  else if (typeof define === 'function' && define.amd)
    define(["react"], factory);
  else if (typeof exports === 'object')
    exports["ReactRouter"] = factory(require("../../../../../node_modules/react/react"));
  else
    root["ReactRouter"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
  return (function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId])
        return installedModules[moduleId].exports;
      var module = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.loaded = true;
      return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
  })([function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _Router2 = __webpack_require__(23);
    var _Router3 = _interopRequireDefault(_Router2);
    exports.Router = _Router3['default'];
    var _Link2 = __webpack_require__(19);
    var _Link3 = _interopRequireDefault(_Link2);
    exports.Link = _Link3['default'];
    var _IndexRoute2 = __webpack_require__(17);
    var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
    exports.IndexRoute = _IndexRoute3['default'];
    var _Redirect2 = __webpack_require__(20);
    var _Redirect3 = _interopRequireDefault(_Redirect2);
    exports.Redirect = _Redirect3['default'];
    var _Route2 = __webpack_require__(21);
    var _Route3 = _interopRequireDefault(_Route2);
    exports.Route = _Route3['default'];
    var _History2 = __webpack_require__(16);
    var _History3 = _interopRequireDefault(_History2);
    exports.History = _History3['default'];
    var _Lifecycle2 = __webpack_require__(18);
    var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
    exports.Lifecycle = _Lifecycle3['default'];
    var _RouteContext2 = __webpack_require__(22);
    var _RouteContext3 = _interopRequireDefault(_RouteContext2);
    exports.RouteContext = _RouteContext3['default'];
    var _useRoutes2 = __webpack_require__(10);
    var _useRoutes3 = _interopRequireDefault(_useRoutes2);
    exports.useRoutes = _useRoutes3['default'];
    var _RouteUtils = __webpack_require__(4);
    exports.createRoutes = _RouteUtils.createRoutes;
    var _RoutingContext2 = __webpack_require__(11);
    var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);
    exports.RoutingContext = _RoutingContext3['default'];
    var _PropTypes2 = __webpack_require__(5);
    var _PropTypes3 = _interopRequireDefault(_PropTypes2);
    exports.PropTypes = _PropTypes3['default'];
    var _match2 = __webpack_require__(29);
    var _match3 = _interopRequireDefault(_match2);
    exports.match = _match3['default'];
    var _Router4 = _interopRequireDefault(_Router2);
    exports['default'] = _Router4['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if (false) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error('Invariant Violation: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  }, function(module, exports) {
    module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
  }, function(module, exports, __webpack_require__) {
    'use strict';
    var warning = function() {};
    if (false) {
      warning = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (format.length < 10 || (/^[s\W]*$/).test(format)) {
          throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
        }
        if (!condition) {
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          if (typeof console !== 'undefined') {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {}
        }
      };
    }
    module.exports = warning;
  }, function(module, exports, __webpack_require__) {
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
    exports.isReactChildren = isReactChildren;
    exports.createRouteFromReactElement = createRouteFromReactElement;
    exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
    exports.createRoutes = createRoutes;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    function isValidChild(object) {
      return object == null || _react2['default'].isValidElement(object);
    }
    function isReactChildren(object) {
      return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
    }
    function checkPropTypes(componentName, propTypes, props) {
      componentName = componentName || 'UnknownComponent';
      for (var propName in propTypes) {
        if (propTypes.hasOwnProperty(propName)) {
          var error = propTypes[propName](props, propName, componentName);
          if (error instanceof Error)
            _warning2['default'](false, error.message);
        }
      }
    }
    function createRoute(defaultProps, props) {
      return _extends({}, defaultProps, props);
    }
    function createRouteFromReactElement(element) {
      var type = element.type;
      var route = createRoute(type.defaultProps, element.props);
      if (type.propTypes)
        checkPropTypes(type.displayName || type.name, type.propTypes, route);
      if (route.children) {
        var childRoutes = createRoutesFromReactChildren(route.children, route);
        if (childRoutes.length)
          route.childRoutes = childRoutes;
        delete route.children;
      }
      return route;
    }
    function createRoutesFromReactChildren(children, parentRoute) {
      var routes = [];
      _react2['default'].Children.forEach(children, function(element) {
        if (_react2['default'].isValidElement(element)) {
          if (element.type.createRouteFromReactElement) {
            var route = element.type.createRouteFromReactElement(element, parentRoute);
            if (route)
              routes.push(route);
          } else {
            routes.push(createRouteFromReactElement(element));
          }
        }
      });
      return routes;
    }
    function createRoutes(routes) {
      if (isReactChildren(routes)) {
        routes = createRoutesFromReactChildren(routes);
      } else if (!Array.isArray(routes)) {
        routes = [routes];
      }
      return routes;
    }
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    exports.falsy = falsy;
    var _react = __webpack_require__(2);
    var func = _react.PropTypes.func;
    var object = _react.PropTypes.object;
    var arrayOf = _react.PropTypes.arrayOf;
    var oneOfType = _react.PropTypes.oneOfType;
    var element = _react.PropTypes.element;
    var shape = _react.PropTypes.shape;
    var string = _react.PropTypes.string;
    function falsy(props, propName, componentName) {
      if (props[propName])
        return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
    }
    var history = shape({
      listen: func.isRequired,
      pushState: func.isRequired,
      replaceState: func.isRequired,
      go: func.isRequired
    });
    exports.history = history;
    var location = shape({
      pathname: string.isRequired,
      search: string.isRequired,
      state: object,
      action: string.isRequired,
      key: string
    });
    exports.location = location;
    var component = oneOfType([func, string]);
    exports.component = component;
    var components = oneOfType([component, object]);
    exports.components = components;
    var route = oneOfType([object, element]);
    exports.route = route;
    var routes = oneOfType([route, arrayOf(route)]);
    exports.routes = routes;
    exports['default'] = {
      falsy: falsy,
      history: history,
      location: location,
      component: component,
      components: components,
      route: route
    };
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    exports.compilePattern = compilePattern;
    exports.matchPattern = matchPattern;
    exports.getParamNames = getParamNames;
    exports.getParams = getParams;
    exports.formatPattern = formatPattern;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function escapeSource(string) {
      return escapeRegExp(string).replace(/\/+/g, '/+');
    }
    function _compilePattern(pattern) {
      var regexpSource = '';
      var paramNames = [];
      var tokens = [];
      var match,
          lastIndex = 0,
          matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*|\(|\)/g;
      while (match = matcher.exec(pattern)) {
        if (match.index !== lastIndex) {
          tokens.push(pattern.slice(lastIndex, match.index));
          regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
        }
        if (match[1]) {
          regexpSource += '([^/?#]+)';
          paramNames.push(match[1]);
        } else if (match[0] === '*') {
          regexpSource += '([\\s\\S]*?)';
          paramNames.push('splat');
        } else if (match[0] === '(') {
          regexpSource += '(?:';
        } else if (match[0] === ')') {
          regexpSource += ')?';
        }
        tokens.push(match[0]);
        lastIndex = matcher.lastIndex;
      }
      if (lastIndex !== pattern.length) {
        tokens.push(pattern.slice(lastIndex, pattern.length));
        regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
      }
      return {
        pattern: pattern,
        regexpSource: regexpSource,
        paramNames: paramNames,
        tokens: tokens
      };
    }
    var CompiledPatternsCache = {};
    function compilePattern(pattern) {
      if (!(pattern in CompiledPatternsCache))
        CompiledPatternsCache[pattern] = _compilePattern(pattern);
      return CompiledPatternsCache[pattern];
    }
    function matchPattern(pattern, pathname) {
      var _compilePattern2 = compilePattern(pattern);
      var regexpSource = _compilePattern2.regexpSource;
      var paramNames = _compilePattern2.paramNames;
      var tokens = _compilePattern2.tokens;
      regexpSource += '/*';
      var captureRemaining = tokens[tokens.length - 1] !== '*';
      if (captureRemaining)
        regexpSource += '([\\s\\S]*?)';
      var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));
      var remainingPathname,
          paramValues;
      if (match != null) {
        paramValues = Array.prototype.slice.call(match, 1).map(function(v) {
          return v != null ? decodeURIComponent(v.replace(/\+/g, '%20')) : v;
        });
        if (captureRemaining) {
          remainingPathname = paramValues.pop();
        } else {
          remainingPathname = pathname.replace(match[0], '');
        }
      } else {
        remainingPathname = paramValues = null;
      }
      return {
        remainingPathname: remainingPathname,
        paramNames: paramNames,
        paramValues: paramValues
      };
    }
    function getParamNames(pattern) {
      return compilePattern(pattern).paramNames;
    }
    function getParams(pattern, pathname) {
      var _matchPattern = matchPattern(pattern, pathname);
      var paramNames = _matchPattern.paramNames;
      var paramValues = _matchPattern.paramValues;
      if (paramValues != null) {
        return paramNames.reduce(function(memo, paramName, index) {
          memo[paramName] = paramValues[index];
          return memo;
        }, {});
      }
      return null;
    }
    function formatPattern(pattern, params) {
      params = params || {};
      var _compilePattern3 = compilePattern(pattern);
      var tokens = _compilePattern3.tokens;
      var parenCount = 0,
          pathname = '',
          splatIndex = 0;
      var token,
          paramName,
          paramValue;
      for (var i = 0,
          len = tokens.length; i < len; ++i) {
        token = tokens[i];
        if (token === '*') {
          paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
          _invariant2['default'](paramValue != null || parenCount > 0, 'Missing splat #%s for path "%s"', splatIndex, pattern);
          if (paramValue != null)
            pathname += encodeURI(paramValue).replace(/%20/g, '+');
        } else if (token === '(') {
          parenCount += 1;
        } else if (token === ')') {
          parenCount -= 1;
        } else if (token.charAt(0) === ':') {
          paramName = token.substring(1);
          paramValue = params[paramName];
          _invariant2['default'](paramValue != null || parenCount > 0, 'Missing "%s" parameter for path "%s"', paramName, pattern);
          if (paramValue != null)
            pathname += encodeURIComponent(paramValue).replace(/%20/g, '+');
        } else {
          pathname += token;
        }
      }
      return pathname.replace(/\/+/g, '/');
    }
  }, function(module, exports) {
    'use strict';
    exports.__esModule = true;
    var PUSH = 'PUSH';
    exports.PUSH = PUSH;
    var REPLACE = 'REPLACE';
    exports.REPLACE = REPLACE;
    var POP = 'POP';
    exports.POP = POP;
    exports['default'] = {
      PUSH: PUSH,
      REPLACE: REPLACE,
      POP: POP
    };
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _Actions = __webpack_require__(7);
    function extractPath(string) {
      var match = string.match(/https?:\/\/[^\/]*/);
      if (match == null)
        return string;
      _warning2['default'](false, 'Location path must be pathname + query string only, not a fully qualified URL like "%s"', string);
      return string.substring(match[0].length);
    }
    function createLocation() {
      var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var action = arguments.length <= 2 || arguments[2] === undefined ? _Actions.POP : arguments[2];
      var key = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
      path = extractPath(path);
      var pathname = path;
      var search = '';
      var hash = '';
      var hashIndex = pathname.indexOf('#');
      if (hashIndex !== -1) {
        hash = pathname.substring(hashIndex);
        pathname = pathname.substring(0, hashIndex);
      }
      var searchIndex = pathname.indexOf('?');
      if (searchIndex !== -1) {
        search = pathname.substring(searchIndex);
        pathname = pathname.substring(0, searchIndex);
      }
      if (pathname === '')
        pathname = '/';
      return {
        pathname: pathname,
        search: search,
        hash: hash,
        state: state,
        action: action,
        key: key
      };
    }
    exports['default'] = createLocation;
    module.exports = exports['default'];
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.loopAsync = loopAsync;
    exports.mapAsync = mapAsync;
    function loopAsync(turns, work, callback) {
      var currentTurn = 0;
      var isDone = false;
      function done() {
        isDone = true;
        callback.apply(this, arguments);
      }
      function next() {
        if (isDone)
          return;
        if (currentTurn < turns) {
          work.call(this, currentTurn++, next, done);
        } else {
          done.apply(this, arguments);
        }
      }
      next();
    }
    function mapAsync(array, work, callback) {
      var length = array.length;
      var values = [];
      if (length === 0)
        return callback(null, values);
      var isDone = false;
      var doneCount = 0;
      function done(index, error, value) {
        if (isDone)
          return;
        if (error) {
          isDone = true;
          callback(error);
        } else {
          values[index] = value;
          isDone = ++doneCount === length;
          if (isDone)
            callback(null, values);
        }
      }
      array.forEach(function(item, index) {
        work(item, index, function(error, value) {
          done(index, error, value);
        });
      });
    }
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _historyLibActions = __webpack_require__(7);
    var _historyLibUseQueries = __webpack_require__(36);
    var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
    var _historyLibCreateLocation = __webpack_require__(8);
    var _historyLibCreateLocation2 = _interopRequireDefault(_historyLibCreateLocation);
    var _computeChangedRoutes2 = __webpack_require__(25);
    var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
    var _TransitionUtils = __webpack_require__(24);
    var _isActive2 = __webpack_require__(28);
    var _isActive3 = _interopRequireDefault(_isActive2);
    var _getComponents = __webpack_require__(26);
    var _getComponents2 = _interopRequireDefault(_getComponents);
    var _matchRoutes = __webpack_require__(30);
    var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
    function hasAnyProperties(object) {
      for (var p in object)
        if (object.hasOwnProperty(p))
          return true;
      return false;
    }
    function useRoutes(createHistory) {
      return function() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var routes = options.routes;
        var historyOptions = _objectWithoutProperties(options, ['routes']);
        var history = _historyLibUseQueries2['default'](createHistory)(historyOptions);
        var state = {};
        function isActive(pathname, query) {
          var indexOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
          return _isActive3['default'](pathname, query, indexOnly, state.location, state.routes, state.params);
        }
        var partialNextState = undefined;
        function match(location, callback) {
          if (partialNextState && partialNextState.location === location) {
            finishMatch(partialNextState, callback);
          } else {
            _matchRoutes2['default'](routes, location, function(error, nextState) {
              if (error) {
                callback(error, null, null);
              } else if (nextState) {
                finishMatch(_extends({}, nextState, {location: location}), function(err, nextLocation, nextState) {
                  if (nextState)
                    state = nextState;
                  callback(err, nextLocation, nextState);
                });
              } else {
                callback(null, null, null);
              }
            });
          }
        }
        function createLocationFromRedirectInfo(_ref) {
          var pathname = _ref.pathname;
          var query = _ref.query;
          var state = _ref.state;
          return _historyLibCreateLocation2['default'](history.createPath(pathname, query), state, _historyLibActions.REPLACE, history.createKey());
        }
        function finishMatch(nextState, callback) {
          var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);
          var leaveRoutes = _computeChangedRoutes.leaveRoutes;
          var enterRoutes = _computeChangedRoutes.enterRoutes;
          _TransitionUtils.runLeaveHooks(leaveRoutes);
          _TransitionUtils.runEnterHooks(enterRoutes, nextState, function(error, redirectInfo) {
            if (error) {
              callback(error);
            } else if (redirectInfo) {
              callback(null, createLocationFromRedirectInfo(redirectInfo), null);
            } else {
              _getComponents2['default'](nextState, function(error, components) {
                if (error) {
                  callback(error);
                } else {
                  callback(null, null, _extends({}, nextState, {components: components}));
                }
              });
            }
          });
        }
        var RouteHooks = {};
        var RouteGuid = 1;
        function getRouteID(route) {
          return route.__id__ || (route.__id__ = RouteGuid++);
        }
        function getRouteHooksForRoutes(routes) {
          return routes.reduce(function(hooks, route) {
            hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
            return hooks;
          }, []);
        }
        function transitionHook(location, callback) {
          _matchRoutes2['default'](routes, location, function(error, nextState) {
            if (nextState == null) {
              callback();
              return;
            }
            partialNextState = _extends({}, nextState, {location: location});
            var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, nextState).leaveRoutes);
            var result = undefined;
            for (var i = 0,
                len = hooks.length; result == null && i < len; ++i) {
              result = hooks[i](location);
            }
            callback(result);
          });
        }
        function beforeUnloadHook() {
          if (state.routes) {
            var hooks = getRouteHooksForRoutes(state.routes);
            var message = undefined;
            for (var i = 0,
                len = hooks.length; typeof message !== 'string' && i < len; ++i) {
              message = hooks[i]();
            }
            return message;
          }
        }
        function registerRouteHook(route, hook) {
          var routeID = getRouteID(route);
          var hooks = RouteHooks[routeID];
          if (hooks == null) {
            var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
            hooks = RouteHooks[routeID] = [hook];
            if (thereWereNoRouteHooks) {
              history.registerTransitionHook(transitionHook);
              if (history.registerBeforeUnloadHook)
                history.registerBeforeUnloadHook(beforeUnloadHook);
            }
          } else if (hooks.indexOf(hook) === -1) {
            hooks.push(hook);
          }
        }
        function unregisterRouteHook(route, hook) {
          var routeID = getRouteID(route);
          var hooks = RouteHooks[routeID];
          if (hooks != null) {
            var newHooks = hooks.filter(function(item) {
              return item !== hook;
            });
            if (newHooks.length === 0) {
              delete RouteHooks[routeID];
              if (!hasAnyProperties(RouteHooks)) {
                history.unregisterTransitionHook(transitionHook);
                if (history.unregisterBeforeUnloadHook)
                  history.unregisterBeforeUnloadHook(beforeUnloadHook);
              }
            } else {
              RouteHooks[routeID] = newHooks;
            }
          }
        }
        function listen(listener) {
          return history.listen(function(location) {
            if (state.location === location) {
              listener(null, state);
            } else {
              match(location, function(error, nextLocation, nextState) {
                if (error) {
                  listener(error);
                } else if (nextState) {
                  listener(null, state);
                } else if (nextLocation) {
                  history.transitionTo(nextLocation);
                } else {
                  _warning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search);
                }
              });
            }
          });
        }
        return _extends({}, history, {
          isActive: isActive,
          registerRouteHook: registerRouteHook,
          unregisterRouteHook: unregisterRouteHook,
          listen: listen,
          match: match
        });
      };
    }
    exports['default'] = useRoutes;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _getRouteParams = __webpack_require__(27);
    var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
    var _React$PropTypes = _react2['default'].PropTypes;
    var array = _React$PropTypes.array;
    var func = _React$PropTypes.func;
    var object = _React$PropTypes.object;
    var RoutingContext = _react2['default'].createClass({
      displayName: 'RoutingContext',
      propTypes: {
        history: object.isRequired,
        createElement: func.isRequired,
        location: object.isRequired,
        routes: array.isRequired,
        params: object.isRequired,
        components: array.isRequired
      },
      getDefaultProps: function getDefaultProps() {
        return {createElement: _react2['default'].createElement};
      },
      childContextTypes: {
        history: object.isRequired,
        location: object.isRequired
      },
      getChildContext: function getChildContext() {
        return {
          history: this.props.history,
          location: this.props.location
        };
      },
      createElement: function createElement(component, props) {
        return component == null ? null : this.props.createElement(component, props);
      },
      render: function render() {
        var _this = this;
        var _props = this.props;
        var history = _props.history;
        var location = _props.location;
        var routes = _props.routes;
        var params = _props.params;
        var components = _props.components;
        var element = null;
        if (components) {
          element = components.reduceRight(function(element, components, index) {
            if (components == null)
              return element;
            var route = routes[index];
            var routeParams = _getRouteParams2['default'](route, params);
            var props = {
              history: history,
              location: location,
              params: params,
              route: route,
              routeParams: routeParams,
              routes: routes
            };
            if (element)
              props.children = element;
            if (typeof components === 'object') {
              var elements = {};
              for (var key in components)
                if (components.hasOwnProperty(key))
                  elements[key] = _this.createElement(components[key], props);
              return elements;
            }
            return _this.createElement(components, props);
          }, element);
        }
        _invariant2['default'](element === null || element === false || _react2['default'].isValidElement(element), 'The root route must render a single element');
        return element;
      }
    });
    exports['default'] = RoutingContext;
    module.exports = exports['default'];
  }, function(module, exports) {
    'use strict';
    exports.__esModule = true;
    exports.addEventListener = addEventListener;
    exports.removeEventListener = removeEventListener;
    exports.getHashPath = getHashPath;
    exports.replaceHashPath = replaceHashPath;
    exports.getWindowPath = getWindowPath;
    exports.go = go;
    exports.getUserConfirmation = getUserConfirmation;
    exports.supportsHistory = supportsHistory;
    exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
    function addEventListener(node, event, listener) {
      if (node.addEventListener) {
        node.addEventListener(event, listener, false);
      } else {
        node.attachEvent('on' + event, listener);
      }
    }
    function removeEventListener(node, event, listener) {
      if (node.removeEventListener) {
        node.removeEventListener(event, listener, false);
      } else {
        node.detachEvent('on' + event, listener);
      }
    }
    function getHashPath() {
      return window.location.href.split('#')[1] || '';
    }
    function replaceHashPath(path) {
      window.location.replace(window.location.pathname + window.location.search + '#' + path);
    }
    function getWindowPath() {
      return window.location.pathname + window.location.search;
    }
    function go(n) {
      if (n)
        window.history.go(n);
    }
    function getUserConfirmation(message, callback) {
      callback(window.confirm(message));
    }
    function supportsHistory() {
      var ua = navigator.userAgent;
      if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
        return false;
      }
      return window.history && 'pushState' in window.history;
    }
    function supportsGoWithoutReloadUsingHash() {
      var ua = navigator.userAgent;
      return ua.indexOf('Firefox') === -1;
    }
  }, function(module, exports) {
    'use strict';
    exports.__esModule = true;
    var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    exports.canUseDOM = canUseDOM;
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _deepEqual = __webpack_require__(37);
    var _deepEqual2 = _interopRequireDefault(_deepEqual);
    var _AsyncUtils = __webpack_require__(31);
    var _Actions = __webpack_require__(7);
    var _createLocation = __webpack_require__(8);
    var _createLocation2 = _interopRequireDefault(_createLocation);
    function createRandomKey(length) {
      return Math.random().toString(36).substr(2, length);
    }
    function locationsAreEqual(a, b) {
      return a.pathname === b.pathname && a.search === b.search && a.key === b.key && _deepEqual2['default'](a.state, b.state);
    }
    var DefaultKeyLength = 6;
    function createHistory() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var getCurrentLocation = options.getCurrentLocation;
      var finishTransition = options.finishTransition;
      var saveState = options.saveState;
      var go = options.go;
      var keyLength = options.keyLength;
      var getUserConfirmation = options.getUserConfirmation;
      if (typeof keyLength !== 'number')
        keyLength = DefaultKeyLength;
      var transitionHooks = [];
      var changeListeners = [];
      var location = undefined;
      var allKeys = [];
      function getCurrent() {
        if (pendingLocation && pendingLocation.action === _Actions.POP) {
          return allKeys.indexOf(pendingLocation.key);
        } else if (location) {
          return allKeys.indexOf(location.key);
        } else {
          return -1;
        }
      }
      function updateLocation(newLocation) {
        var current = getCurrent();
        location = newLocation;
        if (location.action === _Actions.PUSH) {
          allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
        } else if (location.action === _Actions.REPLACE) {
          allKeys[current] = location.key;
        }
        changeListeners.forEach(function(listener) {
          listener(location);
        });
      }
      function addChangeListener(listener) {
        changeListeners.push(listener);
      }
      function removeChangeListener(listener) {
        changeListeners = changeListeners.filter(function(item) {
          return item !== listener;
        });
      }
      function listen(listener) {
        addChangeListener(listener);
        if (location) {
          listener(location);
        } else {
          var _location = getCurrentLocation();
          allKeys = [_location.key];
          updateLocation(_location);
        }
        return function() {
          removeChangeListener(listener);
        };
      }
      function registerTransitionHook(hook) {
        if (transitionHooks.indexOf(hook) === -1)
          transitionHooks.push(hook);
      }
      function unregisterTransitionHook(hook) {
        transitionHooks = transitionHooks.filter(function(item) {
          return item !== hook;
        });
      }
      function runTransitionHook(hook, location, callback) {
        var result = hook(location, callback);
        if (hook.length < 2) {
          callback(result);
        } else {
          _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument call the callback instead');
        }
      }
      function confirmTransitionTo(location, callback) {
        _AsyncUtils.loopAsync(transitionHooks.length, function(index, next, done) {
          runTransitionHook(transitionHooks[index], location, function(result) {
            if (result != null) {
              done(result);
            } else {
              next();
            }
          });
        }, function(message) {
          if (getUserConfirmation && typeof message === 'string') {
            getUserConfirmation(message, function(ok) {
              callback(ok !== false);
            });
          } else {
            callback(message !== false);
          }
        });
      }
      var pendingLocation = undefined;
      function transitionTo(nextLocation) {
        if (location && locationsAreEqual(location, nextLocation))
          return;
        _invariant2['default'](pendingLocation == null, 'transitionTo: Another transition is already in progress');
        pendingLocation = nextLocation;
        confirmTransitionTo(nextLocation, function(ok) {
          pendingLocation = null;
          if (ok) {
            finishTransition(nextLocation);
            updateLocation(nextLocation);
          } else if (location && nextLocation.action === _Actions.POP) {
            var prevIndex = allKeys.indexOf(location.key);
            var nextIndex = allKeys.indexOf(nextLocation.key);
            if (prevIndex !== -1 && nextIndex !== -1)
              go(prevIndex - nextIndex);
          }
        });
      }
      function pushState(state, path) {
        transitionTo(_createLocation2['default'](path, state, _Actions.PUSH, createKey()));
      }
      function replaceState(state, path) {
        transitionTo(_createLocation2['default'](path, state, _Actions.REPLACE, createKey()));
      }
      function setState(state) {
        if (location) {
          updateLocationState(location, state);
          updateLocation(location);
        } else {
          updateLocationState(getCurrentLocation(), state);
        }
      }
      function updateLocationState(location, state) {
        location.state = _extends({}, location.state, state);
        saveState(location.key, location.state);
      }
      function goBack() {
        go(-1);
      }
      function goForward() {
        go(1);
      }
      function createKey() {
        return createRandomKey(keyLength);
      }
      function createPath(path) {
        return path;
      }
      function createHref(path) {
        return createPath(path);
      }
      return {
        listen: listen,
        registerTransitionHook: registerTransitionHook,
        unregisterTransitionHook: unregisterTransitionHook,
        transitionTo: transitionTo,
        pushState: pushState,
        replaceState: replaceState,
        setState: setState,
        go: go,
        goBack: goBack,
        goForward: goForward,
        createKey: createKey,
        createPath: createPath,
        createHref: createHref
      };
    }
    exports['default'] = createHistory;
    module.exports = exports['default'];
  }, function(module, exports) {
    var internals = {};
    internals.hexTable = new Array(256);
    for (var h = 0; h < 256; ++h) {
      internals.hexTable[h] = '%' + ((h < 16 ? '0' : '') + h.toString(16)).toUpperCase();
    }
    exports.arrayToObject = function(source, options) {
      var obj = options.plainObjects ? Object.create(null) : {};
      for (var i = 0,
          il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    exports.merge = function(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== 'object') {
        if (Array.isArray(target)) {
          target.push(source);
        } else if (typeof target === 'object') {
          target[source] = true;
        } else {
          target = [target, source];
        }
        return target;
      }
      if (typeof target !== 'object') {
        target = [target].concat(source);
        return target;
      }
      if (Array.isArray(target) && !Array.isArray(source)) {
        target = exports.arrayToObject(target, options);
      }
      var keys = Object.keys(source);
      for (var k = 0,
          kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
          target[key] = value;
        } else {
          target[key] = exports.merge(target[key], value, options);
        }
      }
      return target;
    };
    exports.decode = function(str) {
      try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
      } catch (e) {
        return str;
      }
    };
    exports.encode = function(str) {
      if (str.length === 0) {
        return str;
      }
      if (typeof str !== 'string') {
        str = '' + str;
      }
      var out = '';
      for (var i = 0,
          il = str.length; i < il; ++i) {
        var c = str.charCodeAt(i);
        if (c === 0x2D || c === 0x2E || c === 0x5F || c === 0x7E || (c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A)) {
          out += str[i];
          continue;
        }
        if (c < 0x80) {
          out += internals.hexTable[c];
          continue;
        }
        if (c < 0x800) {
          out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];
          continue;
        }
        if (c < 0xD800 || c >= 0xE000) {
          out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
          continue;
        }
        ++i;
        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
      }
      return out;
    };
    exports.compact = function(obj, refs) {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      refs = refs || [];
      var lookup = refs.indexOf(obj);
      if (lookup !== -1) {
        return refs[lookup];
      }
      refs.push(obj);
      if (Array.isArray(obj)) {
        var compacted = [];
        for (var i = 0,
            il = obj.length; i < il; ++i) {
          if (typeof obj[i] !== 'undefined') {
            compacted.push(obj[i]);
          }
        }
        return compacted;
      }
      var keys = Object.keys(obj);
      for (i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
      }
      return obj;
    };
    exports.isRegExp = function(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
    };
    exports.isBuffer = function(obj) {
      if (obj === null || typeof obj === 'undefined') {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _PropTypes = __webpack_require__(5);
    var History = {
      contextTypes: {history: _PropTypes.history},
      componentWillMount: function componentWillMount() {
        this.history = this.context.history;
      }
    };
    exports['default'] = History;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _RouteUtils = __webpack_require__(4);
    var _PropTypes = __webpack_require__(5);
    var _React$PropTypes = _react2['default'].PropTypes;
    var bool = _React$PropTypes.bool;
    var func = _React$PropTypes.func;
    var IndexRoute = _react2['default'].createClass({
      displayName: 'IndexRoute',
      statics: {createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
          if (parentRoute) {
            parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
          } else {
            _warning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config');
          }
        }},
      propTypes: {
        path: _PropTypes.falsy,
        ignoreScrollBehavior: bool,
        component: _PropTypes.component,
        components: _PropTypes.components,
        getComponents: func
      },
      render: function render() {
        _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered');
      }
    });
    exports['default'] = IndexRoute;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var object = _react2['default'].PropTypes.object;
    var Lifecycle = {
      propTypes: {route: object},
      contextTypes: {
        history: object.isRequired,
        route: object
      },
      _getRoute: function _getRoute() {
        var route = this.props.route || this.context.route;
        _invariant2['default'](route, 'The Lifecycle mixin needs to be used either on 1) a <Route component> or ' + '2) a descendant of a <Route component> that uses the RouteContext mixin');
        return route;
      },
      componentWillMount: function componentWillMount() {
        _invariant2['default'](this.routerWillLeave, 'The Lifecycle mixin requires you to define a routerWillLeave method');
        this.context.history.registerRouteHook(this._getRoute(), this.routerWillLeave);
      },
      componentWillUnmount: function componentWillUnmount() {
        this.context.history.unregisterRouteHook(this._getRoute(), this.routerWillLeave);
      }
    };
    exports['default'] = Lifecycle;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _React$PropTypes = _react2['default'].PropTypes;
    var bool = _React$PropTypes.bool;
    var object = _React$PropTypes.object;
    var string = _React$PropTypes.string;
    var func = _React$PropTypes.func;
    function isLeftClickEvent(event) {
      return event.button === 0;
    }
    function isModifiedEvent(event) {
      return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
    }
    function isEmptyObject(object) {
      for (var p in object)
        if (object.hasOwnProperty(p))
          return false;
      return true;
    }
    var Link = _react2['default'].createClass({
      displayName: 'Link',
      contextTypes: {history: object},
      propTypes: {
        activeStyle: object,
        activeClassName: string,
        onlyActiveOnIndex: bool.isRequired,
        to: string.isRequired,
        query: object,
        state: object,
        onClick: func
      },
      getDefaultProps: function getDefaultProps() {
        return {
          onlyActiveOnIndex: false,
          className: '',
          style: {}
        };
      },
      handleClick: function handleClick(event) {
        var allowTransition = true;
        var clickResult;
        if (this.props.onClick)
          clickResult = this.props.onClick(event);
        if (isModifiedEvent(event) || !isLeftClickEvent(event))
          return;
        if (clickResult === false || event.defaultPrevented === true)
          allowTransition = false;
        event.preventDefault();
        if (allowTransition)
          this.context.history.pushState(this.props.state, this.props.to, this.props.query);
      },
      componentWillMount: function componentWillMount() {
        _warning2['default'](this.context.history, 'A <Link> should not be rendered outside the context of history; ' + 'some features including real hrefs, active styling, and navigation ' + 'will not function correctly');
      },
      render: function render() {
        var history = this.context.history;
        var _props = this.props;
        var activeClassName = _props.activeClassName;
        var activeStyle = _props.activeStyle;
        var onlyActiveOnIndex = _props.onlyActiveOnIndex;
        var to = _props.to;
        var query = _props.query;
        var state = _props.state;
        var onClick = _props.onClick;
        var props = _objectWithoutProperties(_props, ['activeClassName', 'activeStyle', 'onlyActiveOnIndex', 'to', 'query', 'state', 'onClick']);
        props.onClick = this.handleClick;
        if (history) {
          props.href = history.createHref(to, query);
          if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
            if (history.isActive(to, query, onlyActiveOnIndex)) {
              if (activeClassName)
                props.className += props.className === '' ? activeClassName : ' ' + activeClassName;
              if (activeStyle)
                props.style = _extends({}, props.style, activeStyle);
            }
          }
        }
        return _react2['default'].createElement('a', props);
      }
    });
    exports['default'] = Link;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _RouteUtils = __webpack_require__(4);
    var _PatternUtils = __webpack_require__(6);
    var _PropTypes = __webpack_require__(5);
    var _React$PropTypes = _react2['default'].PropTypes;
    var string = _React$PropTypes.string;
    var object = _React$PropTypes.object;
    var Redirect = _react2['default'].createClass({
      displayName: 'Redirect',
      statics: {createRouteFromReactElement: function createRouteFromReactElement(element) {
          var route = _RouteUtils.createRouteFromReactElement(element);
          if (route.from)
            route.path = route.from;
          _invariant2['default'](route.to.charAt(0) === '/', '<Redirect to> must be an absolute path. This should be fixed in the future');
          route.onEnter = function(nextState, replaceState) {
            var location = nextState.location;
            var params = nextState.params;
            var pathname = route.to ? _PatternUtils.formatPattern(route.to, params) : location.pathname;
            replaceState(route.state || location.state, pathname, route.query || location.query);
          };
          return route;
        }},
      propTypes: {
        path: string,
        from: string,
        to: string.isRequired,
        query: object,
        state: object,
        onEnter: _PropTypes.falsy,
        children: _PropTypes.falsy
      },
      render: function render() {
        _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered');
      }
    });
    exports['default'] = Redirect;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _RouteUtils = __webpack_require__(4);
    var _PropTypes = __webpack_require__(5);
    var _React$PropTypes = _react2['default'].PropTypes;
    var string = _React$PropTypes.string;
    var bool = _React$PropTypes.bool;
    var func = _React$PropTypes.func;
    var Route = _react2['default'].createClass({
      displayName: 'Route',
      statics: {createRouteFromReactElement: function createRouteFromReactElement(element) {
          var route = _RouteUtils.createRouteFromReactElement(element);
          if (route.handler) {
            _warning2['default'](false, '<Route handler> is deprecated, use <Route component> instead');
            route.component = route.handler;
            delete route.handler;
          }
          return route;
        }},
      propTypes: {
        path: string,
        ignoreScrollBehavior: bool,
        handler: _PropTypes.component,
        component: _PropTypes.component,
        components: _PropTypes.components,
        getComponents: func
      },
      render: function render() {
        _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered');
      }
    });
    exports['default'] = Route;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var object = _react2['default'].PropTypes.object;
    var RouteContext = {
      propTypes: {route: object.isRequired},
      childContextTypes: {route: object.isRequired},
      getChildContext: function getChildContext() {
        return {route: this.props.route};
      }
    };
    exports['default'] = RouteContext;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _react = __webpack_require__(2);
    var _react2 = _interopRequireDefault(_react);
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _historyLibCreateHashHistory = __webpack_require__(34);
    var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
    var _RouteUtils = __webpack_require__(4);
    var _RoutingContext = __webpack_require__(11);
    var _RoutingContext2 = _interopRequireDefault(_RoutingContext);
    var _useRoutes = __webpack_require__(10);
    var _useRoutes2 = _interopRequireDefault(_useRoutes);
    var _PropTypes = __webpack_require__(5);
    var _React$PropTypes = _react2['default'].PropTypes;
    var func = _React$PropTypes.func;
    var object = _React$PropTypes.object;
    var Router = _react2['default'].createClass({
      displayName: 'Router',
      propTypes: {
        history: object,
        children: _PropTypes.routes,
        routes: _PropTypes.routes,
        createElement: func,
        onError: func,
        onUpdate: func,
        parseQueryString: func,
        stringifyQuery: func
      },
      getInitialState: function getInitialState() {
        return {
          location: null,
          routes: null,
          params: null,
          components: null
        };
      },
      handleError: function handleError(error) {
        if (this.props.onError) {
          this.props.onError.call(this, error);
        } else {
          throw error;
        }
      },
      componentWillMount: function componentWillMount() {
        var _this = this;
        var _props = this.props;
        var history = _props.history;
        var children = _props.children;
        var routes = _props.routes;
        var parseQueryString = _props.parseQueryString;
        var stringifyQuery = _props.stringifyQuery;
        var createHistory = history ? function() {
          return history;
        } : _historyLibCreateHashHistory2['default'];
        this.history = _useRoutes2['default'](createHistory)({
          routes: _RouteUtils.createRoutes(routes || children),
          parseQueryString: parseQueryString,
          stringifyQuery: stringifyQuery
        });
        this._unlisten = this.history.listen(function(error, state) {
          if (error) {
            _this.handleError(error);
          } else {
            _this.setState(state, _this.props.onUpdate);
          }
        });
      },
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        _warning2['default'](nextProps.history === this.props.history, "The `history` provided to <Router/> has changed, it will be ignored.");
      },
      componentWillUnmount: function componentWillUnmount() {
        if (this._unlisten)
          this._unlisten();
      },
      render: function render() {
        var _state = this.state;
        var location = _state.location;
        var routes = _state.routes;
        var params = _state.params;
        var components = _state.components;
        var createElement = this.props.createElement;
        if (location == null)
          return null;
        return _react2['default'].createElement(_RoutingContext2['default'], {
          history: this.history,
          createElement: createElement,
          location: location,
          routes: routes,
          params: params,
          components: components
        });
      }
    });
    exports['default'] = Router;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    exports.runEnterHooks = runEnterHooks;
    exports.runLeaveHooks = runLeaveHooks;
    var _AsyncUtils = __webpack_require__(9);
    function createEnterHook(hook, route) {
      return function(a, b, callback) {
        hook.apply(route, arguments);
        if (hook.length < 3) {
          callback();
        }
      };
    }
    function getEnterHooks(routes) {
      return routes.reduce(function(hooks, route) {
        if (route.onEnter)
          hooks.push(createEnterHook(route.onEnter, route));
        return hooks;
      }, []);
    }
    function runEnterHooks(routes, nextState, callback) {
      var hooks = getEnterHooks(routes);
      if (!hooks.length) {
        callback();
        return;
      }
      var redirectInfo;
      function replaceState(state, pathname, query) {
        redirectInfo = {
          pathname: pathname,
          query: query,
          state: state
        };
      }
      _AsyncUtils.loopAsync(hooks.length, function(index, next, done) {
        hooks[index](nextState, replaceState, function(error) {
          if (error || redirectInfo) {
            done(error, redirectInfo);
          } else {
            next();
          }
        });
      }, callback);
    }
    function runLeaveHooks(routes) {
      for (var i = 0,
          len = routes.length; i < len; ++i)
        if (routes[i].onLeave)
          routes[i].onLeave.call(routes[i]);
    }
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _PatternUtils = __webpack_require__(6);
    function routeParamsChanged(route, prevState, nextState) {
      if (!route.path)
        return false;
      var paramNames = _PatternUtils.getParamNames(route.path);
      return paramNames.some(function(paramName) {
        return prevState.params[paramName] !== nextState.params[paramName];
      });
    }
    function computeChangedRoutes(prevState, nextState) {
      var prevRoutes = prevState && prevState.routes;
      var nextRoutes = nextState.routes;
      var leaveRoutes,
          enterRoutes;
      if (prevRoutes) {
        leaveRoutes = prevRoutes.filter(function(route) {
          return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
        });
        leaveRoutes.reverse();
        enterRoutes = nextRoutes.filter(function(route) {
          return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
        });
      } else {
        leaveRoutes = [];
        enterRoutes = nextRoutes;
      }
      return {
        leaveRoutes: leaveRoutes,
        enterRoutes: enterRoutes
      };
    }
    exports['default'] = computeChangedRoutes;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _AsyncUtils = __webpack_require__(9);
    function getComponentsForRoute(location, route, callback) {
      if (route.component || route.components) {
        callback(null, route.component || route.components);
      } else if (route.getComponent) {
        route.getComponent(location, callback);
      } else if (route.getComponents) {
        route.getComponents(location, callback);
      } else {
        callback();
      }
    }
    function getComponents(nextState, callback) {
      _AsyncUtils.mapAsync(nextState.routes, function(route, index, callback) {
        getComponentsForRoute(nextState.location, route, callback);
      }, callback);
    }
    exports['default'] = getComponents;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _PatternUtils = __webpack_require__(6);
    function getRouteParams(route, params) {
      var routeParams = {};
      if (!route.path)
        return routeParams;
      var paramNames = _PatternUtils.getParamNames(route.path);
      for (var p in params)
        if (params.hasOwnProperty(p) && paramNames.indexOf(p) !== -1)
          routeParams[p] = params[p];
      return routeParams;
    }
    exports['default'] = getRouteParams;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _PatternUtils = __webpack_require__(6);
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
  }, function(module, exports, __webpack_require__) {
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
    var _historyLibCreateMemoryHistory = __webpack_require__(35);
    var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
    var _useRoutes = __webpack_require__(10);
    var _useRoutes2 = _interopRequireDefault(_useRoutes);
    var _RouteUtils = __webpack_require__(4);
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
  }, function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _AsyncUtils = __webpack_require__(9);
    var _PatternUtils = __webpack_require__(6);
    var _RouteUtils = __webpack_require__(4);
    function getChildRoutes(route, location, callback) {
      if (route.childRoutes) {
        callback(null, route.childRoutes);
      } else if (route.getChildRoutes) {
        route.getChildRoutes(location, function(error, childRoutes) {
          callback(error, !error && _RouteUtils.createRoutes(childRoutes));
        });
      } else {
        callback();
      }
    }
    function getIndexRoute(route, location, callback) {
      if (route.indexRoute) {
        callback(null, route.indexRoute);
      } else if (route.getIndexRoute) {
        route.getIndexRoute(location, function(error, indexRoute) {
          callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
        });
      } else {
        callback();
      }
    }
    function assignParams(params, paramNames, paramValues) {
      return paramNames.reduceRight(function(params, paramName, index) {
        var paramValue = paramValues && paramValues[index];
        if (Array.isArray(params[paramName])) {
          params[paramName].unshift(paramValue);
        } else if (paramName in params) {
          params[paramName] = [paramValue, params[paramName]];
        } else {
          params[paramName] = paramValue;
        }
        return params;
      }, params);
    }
    function createParams(paramNames, paramValues) {
      return assignParams({}, paramNames, paramValues);
    }
    function matchRouteDeep(basename, route, location, callback) {
      var pattern = route.path || '';
      if (pattern.indexOf('/') !== 0)
        pattern = basename.replace(/\/*$/, '/') + pattern;
      var _matchPattern = _PatternUtils.matchPattern(pattern, location.pathname);
      var remainingPathname = _matchPattern.remainingPathname;
      var paramNames = _matchPattern.paramNames;
      var paramValues = _matchPattern.paramValues;
      var isExactMatch = remainingPathname === '';
      if (isExactMatch && route.path) {
        var match = {
          routes: [route],
          params: createParams(paramNames, paramValues)
        };
        getIndexRoute(route, location, function(error, indexRoute) {
          if (error) {
            callback(error);
          } else {
            if (indexRoute)
              match.routes.push(indexRoute);
            callback(null, match);
          }
        });
      } else if (remainingPathname != null || route.childRoutes) {
        getChildRoutes(route, location, function(error, childRoutes) {
          if (error) {
            callback(error);
          } else if (childRoutes) {
            matchRoutes(childRoutes, location, function(error, match) {
              if (error) {
                callback(error);
              } else if (match) {
                match.routes.unshift(route);
                callback(null, match);
              } else {
                callback();
              }
            }, pattern);
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    }
    function matchRoutes(routes, location, callback) {
      var basename = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
      _AsyncUtils.loopAsync(routes.length, function(index, next, done) {
        matchRouteDeep(basename, routes[index], location, function(error, match) {
          if (error || match) {
            done(error, match);
          } else {
            next();
          }
        });
      }, callback);
    }
    exports['default'] = matchRoutes;
    module.exports = exports['default'];
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.loopAsync = loopAsync;
    function loopAsync(turns, work, callback) {
      var currentTurn = 0;
      var isDone = false;
      function done() {
        isDone = true;
        callback.apply(this, arguments);
      }
      function next() {
        if (isDone)
          return;
        if (currentTurn < turns) {
          work.call(this, currentTurn++, next, done);
        } else {
          done.apply(this, arguments);
        }
      }
      next();
    }
  }, function(module, exports) {
    'use strict';
    exports.__esModule = true;
    exports.saveState = saveState;
    exports.readState = readState;
    var KeyPrefix = '@@History/';
    function createKey(key) {
      return KeyPrefix + key;
    }
    function saveState(key, state) {
      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
    }
    function readState(key) {
      var json = window.sessionStorage.getItem(createKey(key));
      if (json) {
        try {
          return JSON.parse(json);
        } catch (error) {}
      }
      return null;
    }
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _ExecutionEnvironment = __webpack_require__(13);
    var _DOMUtils = __webpack_require__(12);
    var _createHistory = __webpack_require__(14);
    var _createHistory2 = _interopRequireDefault(_createHistory);
    function createDOMHistory(options) {
      var history = _createHistory2['default'](_extends({getUserConfirmation: _DOMUtils.getUserConfirmation}, options, {go: _DOMUtils.go}));
      function listen(listener) {
        _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'DOM history needs a DOM');
        return history.listen(listener);
      }
      return _extends({}, history, {listen: listen});
    }
    exports['default'] = createDOMHistory;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _warning = __webpack_require__(3);
    var _warning2 = _interopRequireDefault(_warning);
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _Actions = __webpack_require__(7);
    var _ExecutionEnvironment = __webpack_require__(13);
    var _DOMUtils = __webpack_require__(12);
    var _DOMStateStorage = __webpack_require__(32);
    var _createDOMHistory = __webpack_require__(33);
    var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
    var _createLocation = __webpack_require__(8);
    var _createLocation2 = _interopRequireDefault(_createLocation);
    function isAbsolutePath(path) {
      return typeof path === 'string' && path.charAt(0) === '/';
    }
    function ensureSlash() {
      var path = _DOMUtils.getHashPath();
      if (isAbsolutePath(path))
        return true;
      _DOMUtils.replaceHashPath('/' + path);
      return false;
    }
    function addQueryStringValueToPath(path, key, value) {
      return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
    }
    function stripQueryStringValueFromPath(path, key) {
      return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
    }
    function getQueryStringValueFromPath(path, key) {
      var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
      return match && match[1];
    }
    var DefaultQueryKey = '_k';
    function createHashHistory() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'Hash history needs a DOM');
      var queryKey = options.queryKey;
      if (queryKey === undefined || !!queryKey)
        queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
      function getCurrentLocation() {
        var path = _DOMUtils.getHashPath();
        var key = undefined,
            state = undefined;
        if (queryKey) {
          key = getQueryStringValueFromPath(path, queryKey);
          path = stripQueryStringValueFromPath(path, queryKey);
          if (key) {
            state = _DOMStateStorage.readState(key);
          } else {
            state = null;
            key = history.createKey();
            _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
          }
        }
        return _createLocation2['default'](path, state, undefined, key);
      }
      function startHashChangeListener(_ref) {
        var transitionTo = _ref.transitionTo;
        function hashChangeListener() {
          if (!ensureSlash())
            return;
          transitionTo(getCurrentLocation());
        }
        ensureSlash();
        _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
        return function() {
          _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
        };
      }
      function finishTransition(location) {
        var pathname = location.pathname;
        var search = location.search;
        var state = location.state;
        var action = location.action;
        var key = location.key;
        if (action === _Actions.POP)
          return;
        var path = pathname + search;
        if (queryKey)
          path = addQueryStringValueToPath(path, queryKey, key);
        if (path === _DOMUtils.getHashPath()) {
          _warning2['default'](false, 'You cannot %s the same path using hash history', action);
        } else {
          if (queryKey) {
            _DOMStateStorage.saveState(key, state);
          } else {
            location.key = location.state = null;
          }
          if (action === _Actions.PUSH) {
            window.location.hash = path;
          } else {
            _DOMUtils.replaceHashPath(path);
          }
        }
      }
      var history = _createDOMHistory2['default'](_extends({}, options, {
        getCurrentLocation: getCurrentLocation,
        finishTransition: finishTransition,
        saveState: _DOMStateStorage.saveState
      }));
      var listenerCount = 0,
          stopHashChangeListener = undefined;
      function listen(listener) {
        if (++listenerCount === 1)
          stopHashChangeListener = startHashChangeListener(history);
        var unlisten = history.listen(listener);
        return function() {
          unlisten();
          if (--listenerCount === 0)
            stopHashChangeListener();
        };
      }
      function pushState(state, path) {
        _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped');
        history.pushState(state, path);
      }
      function replaceState(state, path) {
        _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped');
        history.replaceState(state, path);
      }
      var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
      function go(n) {
        _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
        history.go(n);
      }
      function createHref(path) {
        return '#' + history.createHref(path);
      }
      return _extends({}, history, {
        listen: listen,
        pushState: pushState,
        replaceState: replaceState,
        go: go,
        createHref: createHref
      });
    }
    exports['default'] = createHashHistory;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _invariant = __webpack_require__(1);
    var _invariant2 = _interopRequireDefault(_invariant);
    var _Actions = __webpack_require__(7);
    var _createLocation = __webpack_require__(8);
    var _createLocation2 = _interopRequireDefault(_createLocation);
    var _createHistory = __webpack_require__(14);
    var _createHistory2 = _interopRequireDefault(_createHistory);
    function createStorage(entries) {
      return entries.filter(function(entry) {
        return entry.state;
      }).reduce(function(memo, entry) {
        memo[entry.key] = entry.state;
        return memo;
      }, {});
    }
    function createMemoryHistory() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      if (Array.isArray(options)) {
        options = {entries: options};
      } else if (typeof options === 'string') {
        options = {entries: [options]};
      }
      var history = _createHistory2['default'](_extends({}, options, {
        getCurrentLocation: getCurrentLocation,
        finishTransition: finishTransition,
        saveState: saveState,
        go: go
      }));
      var _options = options;
      var entries = _options.entries;
      var current = _options.current;
      if (typeof entries === 'string') {
        entries = [entries];
      } else if (!Array.isArray(entries)) {
        entries = ['/'];
      }
      entries = entries.map(function(entry) {
        var key = history.createKey();
        if (typeof entry === 'string')
          return {
            pathname: entry,
            key: key
          };
        if (typeof entry === 'object' && entry)
          return _extends({}, entry, {key: key});
        _invariant2['default'](false, 'Unable to create history entry from %s', entry);
      });
      if (current == null) {
        current = entries.length - 1;
      } else {
        _invariant2['default'](current >= 0 && current < entries.length, 'Current index must be >= 0 and < %s, was %s', entries.length, current);
      }
      var storage = createStorage(entries);
      function saveState(key, state) {
        storage[key] = state;
      }
      function readState(key) {
        return storage[key];
      }
      function getCurrentLocation() {
        var entry = entries[current];
        var key = entry.key;
        var pathname = entry.pathname;
        var search = entry.search;
        var path = pathname + (search || '');
        var state = undefined;
        if (key) {
          state = readState(key);
        } else {
          state = null;
          key = history.createKey();
          entry.key = key;
        }
        return _createLocation2['default'](path, state, undefined, key);
      }
      function canGo(n) {
        var index = current + n;
        return index >= 0 && index < entries.length;
      }
      function go(n) {
        if (n) {
          _invariant2['default'](canGo(n), 'Cannot go(%s) there is not enough history', n);
          current += n;
          var currentLocation = getCurrentLocation();
          history.transitionTo(_extends({}, currentLocation, {action: _Actions.POP}));
        }
      }
      function finishTransition(location) {
        switch (location.action) {
          case _Actions.PUSH:
            current += 1;
            if (current < entries.length) {
              entries.splice(current);
            }
            entries.push(location);
            saveState(location.key, location.state);
            break;
          case _Actions.REPLACE:
            entries[current] = location;
            saveState(location.key, location.state);
            break;
        }
      }
      return history;
    }
    exports['default'] = createMemoryHistory;
    module.exports = exports['default'];
  }, function(module, exports, __webpack_require__) {
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var _qs = __webpack_require__(40);
    var _qs2 = _interopRequireDefault(_qs);
    function defaultStringifyQuery(query) {
      return _qs2['default'].stringify(query, {arrayFormat: 'brackets'});
    }
    function defaultParseQueryString(queryString) {
      return _qs2['default'].parse(queryString);
    }
    function useQueries(createHistory) {
      return function() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var stringifyQuery = options.stringifyQuery;
        var parseQueryString = options.parseQueryString;
        var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);
        var history = createHistory(historyOptions);
        if (typeof stringifyQuery !== 'function')
          stringifyQuery = defaultStringifyQuery;
        if (typeof parseQueryString !== 'function')
          parseQueryString = defaultParseQueryString;
        function listen(listener) {
          return history.listen(function(location) {
            if (!location.query)
              location.query = parseQueryString(location.search.substring(1));
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
          if (query == null || (queryString = stringifyQuery(query)) === '')
            return pathname;
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
  }, function(module, exports, __webpack_require__) {
    var pSlice = Array.prototype.slice;
    var objectKeys = __webpack_require__(39);
    var isArguments = __webpack_require__(38);
    var deepEqual = module.exports = function(actual, expected, opts) {
      if (!opts)
        opts = {};
      if (actual === expected) {
        return true;
      } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
      } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
        return opts.strict ? actual === expected : actual == expected;
      } else {
        return objEquiv(actual, expected, opts);
      }
    };
    function isUndefinedOrNull(value) {
      return value === null || value === undefined;
    }
    function isBuffer(x) {
      if (!x || typeof x !== 'object' || typeof x.length !== 'number')
        return false;
      if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
        return false;
      }
      if (x.length > 0 && typeof x[0] !== 'number')
        return false;
      return true;
    }
    function objEquiv(a, b, opts) {
      var i,
          key;
      if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
        return false;
      if (a.prototype !== b.prototype)
        return false;
      if (isArguments(a)) {
        if (!isArguments(b)) {
          return false;
        }
        a = pSlice.call(a);
        b = pSlice.call(b);
        return deepEqual(a, b, opts);
      }
      if (isBuffer(a)) {
        if (!isBuffer(b)) {
          return false;
        }
        if (a.length !== b.length)
          return false;
        for (i = 0; i < a.length; i++) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      }
      try {
        var ka = objectKeys(a),
            kb = objectKeys(b);
      } catch (e) {
        return false;
      }
      if (ka.length != kb.length)
        return false;
      ka.sort();
      kb.sort();
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i])
          return false;
      }
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key], opts))
          return false;
      }
      return typeof a === typeof b;
    }
  }, function(module, exports) {
    var supportsArgumentsClass = (function() {
      return Object.prototype.toString.call(arguments);
    })() == '[object Arguments]';
    exports = module.exports = supportsArgumentsClass ? supported : unsupported;
    exports.supported = supported;
    function supported(object) {
      return Object.prototype.toString.call(object) == '[object Arguments]';
    }
    ;
    exports.unsupported = unsupported;
    function unsupported(object) {
      return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
    }
    ;
  }, function(module, exports) {
    exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;
    exports.shim = shim;
    function shim(obj) {
      var keys = [];
      for (var key in obj)
        keys.push(key);
      return keys;
    }
  }, function(module, exports, __webpack_require__) {
    var Stringify = __webpack_require__(42);
    var Parse = __webpack_require__(41);
    var internals = {};
    module.exports = {
      stringify: Stringify,
      parse: Parse
    };
  }, function(module, exports, __webpack_require__) {
    var Utils = __webpack_require__(15);
    var internals = {
      delimiter: '&',
      depth: 5,
      arrayLimit: 20,
      parameterLimit: 1000,
      strictNullHandling: false,
      plainObjects: false,
      allowPrototypes: false
    };
    internals.parseValues = function(str, options) {
      var obj = {};
      var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
      for (var i = 0,
          il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
        if (pos === -1) {
          obj[Utils.decode(part)] = '';
          if (options.strictNullHandling) {
            obj[Utils.decode(part)] = null;
          }
        } else {
          var key = Utils.decode(part.slice(0, pos));
          var val = Utils.decode(part.slice(pos + 1));
          if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = val;
          } else {
            obj[key] = [].concat(obj[key]).concat(val);
          }
        }
      }
      return obj;
    };
    internals.parseObject = function(chain, val, options) {
      if (!chain.length) {
        return val;
      }
      var root = chain.shift();
      var obj;
      if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
      } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        var indexString = '' + index;
        if (!isNaN(index) && root !== cleanRoot && indexString === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
          obj = [];
          obj[index] = internals.parseObject(chain, val, options);
        } else {
          obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
      }
      return obj;
    };
    internals.parseKeys = function(key, val, options) {
      if (!key) {
        return;
      }
      if (options.allowDots) {
        key = key.replace(/\.([^\.\[]+)/g, '[$1]');
      }
      var parent = /^([^\[\]]*)/;
      var child = /(\[[^\[\]]*\])/g;
      var segment = parent.exec(key);
      var keys = [];
      if (segment[1]) {
        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1])) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      var i = 0;
      while ((segment = child.exec(key)) !== null && i < options.depth) {
        ++i;
        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
          if (!options.allowPrototypes) {
            continue;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
      }
      return internals.parseObject(keys, val, options);
    };
    module.exports = function(str, options) {
      options = options || {};
      options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
      options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
      options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
      options.parseArrays = options.parseArrays !== false;
      options.allowDots = options.allowDots !== false;
      options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : internals.plainObjects;
      options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : internals.allowPrototypes;
      options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
      options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
      if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
      }
      var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0,
          il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj, options);
      }
      return Utils.compact(obj);
    };
  }, function(module, exports, __webpack_require__) {
    var Utils = __webpack_require__(15);
    var internals = {
      delimiter: '&',
      arrayPrefixGenerators: {
        brackets: function(prefix, key) {
          return prefix + '[]';
        },
        indices: function(prefix, key) {
          return prefix + '[' + key + ']';
        },
        repeat: function(prefix, key) {
          return prefix;
        }
      },
      strictNullHandling: false
    };
    internals.stringify = function(obj, prefix, generateArrayPrefix, strictNullHandling, filter) {
      if (typeof filter === 'function') {
        obj = filter(prefix, obj);
      } else if (Utils.isBuffer(obj)) {
        obj = obj.toString();
      } else if (obj instanceof Date) {
        obj = obj.toISOString();
      } else if (obj === null) {
        if (strictNullHandling) {
          return Utils.encode(prefix);
        }
        obj = '';
      }
      if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
        return [Utils.encode(prefix) + '=' + Utils.encode(obj)];
      }
      var values = [];
      if (typeof obj === 'undefined') {
        return values;
      }
      var objKeys = Array.isArray(filter) ? filter : Object.keys(obj);
      for (var i = 0,
          il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        if (Array.isArray(obj)) {
          values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, filter));
        } else {
          values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, filter));
        }
      }
      return values;
    };
    module.exports = function(obj, options) {
      options = options || {};
      var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
      var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
      var objKeys;
      var filter;
      if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
      } else if (Array.isArray(options.filter)) {
        objKeys = filter = options.filter;
      }
      var keys = [];
      if (typeof obj !== 'object' || obj === null) {
        return '';
      }
      var arrayFormat;
      if (options.arrayFormat in internals.arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
      } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
      } else {
        arrayFormat = 'indices';
      }
      var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      for (var i = 0,
          il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, filter));
      }
      return keys.join(delimiter);
    };
  }]);
});
;
