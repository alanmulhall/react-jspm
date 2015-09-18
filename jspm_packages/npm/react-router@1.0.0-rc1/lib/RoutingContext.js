/* */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _getRouteParams = require('./getRouteParams');

var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

"format cjs";
var _React$PropTypes = _react2['default'].PropTypes;
var array = _React$PropTypes.array;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

/**
 * A <RoutingContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */
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
    return {
      createElement: _react2['default'].createElement
    };
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
      element = components.reduceRight(function (element, components, index) {
        if (components == null) return element; // Don't create new children; use the grandchildren.

        var route = routes[index];
        var routeParams = (0, _getRouteParams2['default'])(route, params);
        var props = {
          history: history,
          location: location,
          params: params,
          route: route,
          routeParams: routeParams,
          routes: routes
        };

        if (element) props.children = element;

        if (typeof components === 'object') {
          var elements = {};

          for (var key in components) if (components.hasOwnProperty(key)) elements[key] = _this.createElement(components[key], props);

          return elements;
        }

        return _this.createElement(components, props);
      }, element);
    }

    (0, _invariant2['default'])(element === null || element === false || _react2['default'].isValidElement(element), 'The root route must render a single element');

    return element;
  }

});

exports['default'] = RoutingContext;
module.exports = exports['default'];