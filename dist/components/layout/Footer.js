"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fa = require("react-icons/fa");
var _FooterModule = _interopRequireDefault(require("./Footer.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: _FooterModule.default.footer
  }, /*#__PURE__*/React.createElement("ul", {
    className: _FooterModule.default.social_list
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.facebook.com/?locale=pt_BR"
  }, /*#__PURE__*/React.createElement(_fa.FaFacebook, null))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/gabriel.raupp17/"
  }, /*#__PURE__*/React.createElement(_fa.FaInstagram, null))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/checkpoint/challenge/AgFw1s0up6YjiwAAAZBLshnxQjlnMVOY525QlcnAvM_jECGIVnmyMp8ifWbemZrPEXKhyxLzOVl0U9LahPvlX0wAryJjSA?ut=3rSFr8wbj9eHk1"
  }, /*#__PURE__*/React.createElement(_fa.FaLinkedin, null)))), /*#__PURE__*/React.createElement("p", {
    className: _FooterModule.default.copy_right
  }, /*#__PURE__*/React.createElement("span", null, "IntelAgend"), " \xA9 2024"));
}
var _default = exports.default = Footer;