"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ContactModule = _interopRequireDefault(require("./Contact.module.css"));
var _fa = require("react-icons/fa");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Contact() {
  return /*#__PURE__*/React.createElement("section", {
    className: _ContactModule.default.Contact
  }, /*#__PURE__*/React.createElement("h1", {
    className: _ContactModule.default.h1
  }, "Meu cart\xE3o do desenvolvedor"), /*#__PURE__*/React.createElement("ul", {
    className: _ContactModule.default.social_list
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.facebook.com/?locale=pt_BR"
  }, /*#__PURE__*/React.createElement(_fa.FaFacebook, null))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/gabriel.raupp17/"
  }, /*#__PURE__*/React.createElement(_fa.FaInstagram, null))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/checkpoint/challenge/AgFw1s0up6YjiwAAAZBLshnxQjlnMVOY525QlcnAvM_jECGIVnmyMp8ifWbemZrPEXKhyxLzOVl0U9LahPvlX0wAryJjSA?ut=3rSFr8wbj9eHk1"
  }, /*#__PURE__*/React.createElement(_fa.FaLinkedin, null))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/GabrielRaupp"
  }, /*#__PURE__*/React.createElement(_fa.FaGithub, null)))));
}
var _default = exports.default = Contact;