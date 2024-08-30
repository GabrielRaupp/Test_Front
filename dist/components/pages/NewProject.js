"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _ProjectForm = _interopRequireDefault(require("../project/ProjectForm"));
var _NewProjectModule = _interopRequireDefault(require("./NewProject.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function NewProject() {
  const history = (0, _reactRouterDom.useHistory)();
  function createPost(project) {
    project.cost = 0;
    project.services = [];
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    }).then(resp => resp.json()).then(data => {
      history.push('/projects', {
        state: {
          message: 'Projeto criado com sucesso!'
        }
      });
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: _NewProjectModule.default.newproject_container
  }, /*#__PURE__*/React.createElement("h1", null, "Criar Hor\xE1rio"), /*#__PURE__*/React.createElement("p", null, "Crie seu hor\xE1rio para depois adicionar os servi\xE7os"), /*#__PURE__*/React.createElement(_ProjectForm.default, {
    handleSubmit: createPost,
    btnText: "Criar Hor\xE1rio"
  }));
}
var _default = exports.default = NewProject;