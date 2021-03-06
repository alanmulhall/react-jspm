/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _react = require("../../../../../node_modules/react/react");
var _react2 = _interopRequireDefault(_react);
var _warning = require("warning");
var _warning2 = _interopRequireDefault(_warning);
var _historyLibCreateHashHistory = require("history/lib/createHashHistory");
var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
var _RouteUtils = require("./RouteUtils");
var _RoutingContext = require("./RoutingContext");
var _RoutingContext2 = _interopRequireDefault(_RoutingContext);
var _useRoutes = require("./useRoutes");
var _useRoutes2 = _interopRequireDefault(_useRoutes);
var _PropTypes = require("./PropTypes");
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
