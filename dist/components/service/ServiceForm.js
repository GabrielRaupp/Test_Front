"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _Input = _interopRequireDefault(require("../form/Input"));
var _SubmitButton = _interopRequireDefault(require("../form/SubmitButton"));
var _ProjectFormModule = _interopRequireDefault(require("../project/ProjectForm.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ServiceForm(_ref) {
  let {
    handleSubmit,
    btnText,
    projectData
  } = _ref;
  const [service, setService] = (0, _react.useState)({});
  const submit = e => {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  };
  function handleChange(e) {
    setService({
      ...service,
      [e.target.name]: e.target.value
    });
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: _ProjectFormModule.default.form
  }, /*#__PURE__*/React.createElement(_Input.default, {
    type: "text",
    text: "Nome do servi\xE7o",
    name: "name",
    placeholder: "Insira o nome do servi\xE7o",
    handleOnChange: handleChange
  }), /*#__PURE__*/React.createElement(_Input.default, {
    type: "number",
    text: "Custo do servi\xE7o",
    name: "cost",
    placeholder: "Insira o valor total",
    handleOnChange: handleChange
  }), /*#__PURE__*/React.createElement(_Input.default, {
    type: "text",
    text: "Descri\xE7\xE3o do projeto",
    name: "description",
    placeholder: "Descreva o servi\xE7o",
    handleOnChange: handleChange
  }), /*#__PURE__*/React.createElement(_SubmitButton.default, {
    text: btnText
  }));
}
var _default = exports.default = ServiceForm;