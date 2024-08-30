"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SelectModule = _interopRequireDefault(require("./Select.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Select = () => {
  // Array de opções
  const options = [{
    id: 1,
    name: 'Trabalho'
  }, {
    id: 2,
    name: 'Prova'
  }, {
    id: 3,
    name: 'Orientação'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: _SelectModule.default.form_control
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "mySelect"
  }, "Escolha o Tipo de Trabalho:"), /*#__PURE__*/React.createElement("select", {
    id: "mySelect"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione uma op\xE7\xE3o"), options.map(option => /*#__PURE__*/React.createElement("option", {
    value: option.id,
    key: option.id
  }, option.name))));
};
var _default = exports.default = Select;