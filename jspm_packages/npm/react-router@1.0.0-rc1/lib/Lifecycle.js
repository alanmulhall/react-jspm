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
