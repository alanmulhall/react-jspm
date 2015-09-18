/* */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PropTypes = require('./PropTypes');

"format cjs";

var History = {

  contextTypes: { history: _PropTypes.history },

  componentWillMount: function componentWillMount() {
    this.history = this.context.history;
  }

};

exports["default"] = History;
module.exports = exports["default"];