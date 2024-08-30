"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _Container = _interopRequireDefault(require("../layout/Container"));
var _Loading = _interopRequireDefault(require("../layout/Loading"));
var _LinkButton = _interopRequireDefault(require("../layout/LinkButton"));
var _ProjectCard = _interopRequireDefault(require("../project/ProjectCard"));
var _Message = _interopRequireDefault(require("../layout/Message"));
var _ProjectsModule = _interopRequireDefault(require("./Projects.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Projects() {
  const [projects, setProjects] = (0, _react.useState)([]);
  const [removeLoading, setRemoveLoading] = (0, _react.useState)(false);
  const [projectMessage, setProjectMessage] = (0, _react.useState)('');
  const location = (0, _reactRouterDom.useLocation)();
  let message = '';
  if (location.state) {
    message = location.state.message;
  }
  (0, _react.useEffect)(() => {
    setTimeout(() => fetch('http://localhost:3000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json()).then(data => {
      setProjects(data);
      setRemoveLoading(true);
    }), 100);
  }, []);
  function removeProject(id) {
    fetch(`http://localhost:3000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setProjects(projects.filter(project => project.id !== id));
      setProjectMessage('Projeto removido com sucesso!');
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: _ProjectsModule.default.project_container
  }, /*#__PURE__*/React.createElement("div", {
    className: _ProjectsModule.default.title_container
  }, /*#__PURE__*/React.createElement("h1", null, "Meus Hor\xE1rios"), /*#__PURE__*/React.createElement(_LinkButton.default, {
    to: "/newproject",
    text: "Montar hor\xE1rio"
  })), message && /*#__PURE__*/React.createElement(_Message.default, {
    type: "success",
    msg: message
  }), projectMessage && /*#__PURE__*/React.createElement(_Message.default, {
    type: "success",
    msg: projectMessage
  }), /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "start"
  }, projects.length > 0 && projects.map(project => /*#__PURE__*/React.createElement(_ProjectCard.default, {
    id: project.id,
    name: project.name,
    budget: project.budget,
    category: project.category.name,
    key: project.id,
    handleRemove: removeProject
  })), !removeLoading && /*#__PURE__*/React.createElement(_Loading.default, null), removeLoading && projects.length === 0 && /*#__PURE__*/React.createElement("p", null, "N\xE3o h\xE1 projetos cadastrados!")));
}
var _default = exports.default = Projects;