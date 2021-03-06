/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _react = require("../../../../../node_modules/react/react");
var _react2 = _interopRequireDefault(_react);
var _invariant = require("invariant");
var _invariant2 = _interopRequireDefault(_invariant);
var _RouteUtils = require("./RouteUtils");
var _PatternUtils = require("./PatternUtils");
var _PropTypes = require("./PropTypes");
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
