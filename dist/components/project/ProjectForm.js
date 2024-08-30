"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _Input = _interopRequireDefault(require("../form/Input"));
var _Select = _interopRequireDefault(require("../form/Select"));
var _SubmitButton = _interopRequireDefault(require("../form/SubmitButton"));
var _ProjectFormModule = _interopRequireDefault(require("./ProjectForm.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ProjectForm(_ref) {
  let {
    handleSubmit,
    btnText,
    projectData
  } = _ref;
  const [project, setProject] = (0, _react.useState)(projectData || {});
  const [categories, setCategories] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json()).then(data => {
      setCategories(data);
    });
  }, []);
  const submit = e => {
    e.preventDefault();
    handleSubmit(project);
  };
  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  }
  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    });
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: _ProjectFormModule.default.form
  }, /*#__PURE__*/React.createElement(_Input.default, {
    type: "text",
    text: "Nome do Lembrete",
    name: "name",
    placeholder: "Insira aqui",
    handleOnChange: handleChange,
    value: project.name
  }), /*#__PURE__*/React.createElement(_Input.default, {
    type: "text",
    text: "Horario do projeto",
    name: "budget",
    placeholder: "Insira o Horario",
    handleOnChange: handleChange,
    value: project.budget
  }), /*#__PURE__*/React.createElement(_Select.default, {
    name: "category_id",
    text: "Selecione a categoria",
    options: categories,
    handleOnChange: handleCategory,
    value: project.category ? project.category.id : ''
  }), /*#__PURE__*/React.createElement(_SubmitButton.default, {
    text: btnText
  }));
}
var _default = exports.default = ProjectForm;