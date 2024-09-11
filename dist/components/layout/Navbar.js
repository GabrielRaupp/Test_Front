"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _Container = _interopRequireDefault(require("./Container"));
var _NavbarModule = _interopRequireDefault(require("./Navbar.module.css"));
var _costs_logo = _interopRequireDefault(require("../../img/costs_logo.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Navbar() {
  /*#__PURE__*/React.createElement("span", null, "IntelAgend");
  return /*#__PURE__*/React.createElement("div", {
    className: _NavbarModule.default.navbar
  }, /*#__PURE__*/React.createElement(_Container.default, null, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/"
  }, /*#__PURE__*/React.createElement("img", {
    src: _costs_logo.default,
    alt: "Costs"
  })), /*#__PURE__*/React.createElement("ul", {
    className: _NavbarModule.default.list
  }, /*#__PURE__*/React.createElement("li", {
    className: _NavbarModule.default.item
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Home")), /*#__PURE__*/React.createElement("li", {
    className: _NavbarModule.default.item
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/horarios"
  }, "Agenda")), /*#__PURE__*/React.createElement("li", {
    className: _NavbarModule.default.item
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/contact"
  }, "Contato")), /*#__PURE__*/React.createElement("li", {
    className: _NavbarModule.default.item
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: "/singup"
  }, "Minha conta")))));
}
var _default = exports.default = Navbar;