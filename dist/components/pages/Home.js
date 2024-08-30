"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HomeModule = _interopRequireDefault(require("./Home.module.css"));
var _savings = _interopRequireDefault(require("../../img/savings.svg"));
var _LinkButton = _interopRequireDefault(require("../layout/LinkButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Home() {
  return /*#__PURE__*/React.createElement("section", {
    className: _HomeModule.default.home_container
  }, /*#__PURE__*/React.createElement("h1", null, "Bem-vindo ao ", /*#__PURE__*/React.createElement("span", null, "IntelAgend")), /*#__PURE__*/React.createElement("p", null, "Monte seu horario aqui no bot\xE3o abaixo!"), /*#__PURE__*/React.createElement(_LinkButton.default, {
    to: "/newproject",
    text: "Criar Horario/Lembrete"
  }), /*#__PURE__*/React.createElement("img", {
    src: _savings.default,
    alt: "Savings"
  }));
}
var _default = exports.default = Home;