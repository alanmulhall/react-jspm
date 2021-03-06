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
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _warning = require("warning");
var _warning2 = _interopRequireDefault(_warning);
var _invariant = require("invariant");
var _invariant2 = _interopRequireDefault(_invariant);
var _deepEqual = require("deep-equal");
var _deepEqual2 = _interopRequireDefault(_deepEqual);
var _AsyncUtils = require("./AsyncUtils");
var _Actions = require("./Actions");
var _createLocation = require("./createLocation");
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
