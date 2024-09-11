"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _SingUpModule = _interopRequireDefault(require("./SingUp.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SingUp() {
  return /*#__PURE__*/React.createElement("section", {
    className: _SingUpModule.default.div
  }, /*#__PURE__*/React.createElement("h1", {
    className: _SingUpModule.default.h1
  }, " "), /*#__PURE__*/React.createElement("ul", {
    className: _SingUpModule.default.div
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h1", {
    className: _SingUpModule.default.conta
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/login"
  }, "J\xE1 tenho conta"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h1", {
    className: _SingUpModule.default.conta
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/register"
  }, "N\xE3o tenho conta")))));
}
var _default = exports.default = SingUp;