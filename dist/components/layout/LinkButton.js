"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LinkButtonModule = _interopRequireDefault(require("./LinkButton.module.css"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function LinkButton(_ref) {
  let {
    to,
    text
  } = _ref;
  return /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    className: _LinkButtonModule.default.btn,
    to: to
  }, text);
}
var _default = exports.default = LinkButton;