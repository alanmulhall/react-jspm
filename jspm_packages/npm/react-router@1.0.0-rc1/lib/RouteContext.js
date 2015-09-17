/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _react = require("../../../../../node_modules/react/react");
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