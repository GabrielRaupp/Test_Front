"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _reactRouterDom = require("react-router-dom");
var _react = require("react");
var _ProjectModule = _interopRequireDefault(require("./Project.module.css"));
var _Loading = _interopRequireDefault(require("../layout/Loading"));
var _Container = _interopRequireDefault(require("../layout/Container"));
var _ProjectForm = _interopRequireDefault(require("../project/ProjectForm"));
var _Message = _interopRequireDefault(require("../layout/Message"));
var _ServiceForm = _interopRequireDefault(require("../service/ServiceForm"));
var _ServiceCard = _interopRequireDefault(require("../service/ServiceCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Project() {
  let {
    id
  } = (0, _reactRouterDom.useParams)();
  const [project, setProject] = (0, _react.useState)({});
  const [showProjectForm, setShowProjectForm] = (0, _react.useState)(false);
  const [showServiceForm, setShowServiceForm] = (0, _react.useState)(false);
  const [services, setServices] = (0, _react.useState)([]);
  const [message, setMessage] = (0, _react.useState)('');
  const [type, setType] = (0, _react.useState)('success');
  (0, _react.useEffect)(() => {
    setTimeout(() => fetch(`http://localhost:3000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json()).then(data => {
      setProject(data);
      setServices(data.services);
    }), 0);
  }, [id]);
  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }
    fetch(`http://localhost:3000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    }).then(resp => resp.json()).then(data => {
      setProject(data);
      setShowProjectForm(!showProjectForm);
      setMessage('Projeto atualizado!');
      setType('success');
    });
  }
  function createService(project) {
    const lastService = project.services[project.services.length - 1];
    lastService.id = (0, _uuid.v4)();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('error');
      project.services.pop();
      return false;
    }
    project.cost = newCost;
    fetch(`http://localhost:3000/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lastService)
    }).then(resp => resp.json()).then(serviceData => {
      setServices([...services, serviceData]);
      setShowServiceForm(!showServiceForm);
      setMessage('Serviço adicionado!');
      setType('success');

      // Atualiza o custo total do projeto
      return fetch(`http://localhost:3000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cost: newCost
        })
      });
    }).then(() => setProject({
      ...project,
      cost: newCost
    }));
  }
  function removeService(serviceId, cost) {
    fetch(`http://localhost:3000/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      const servicesUpdated = project.services.filter(service => service.id !== serviceId);
      const projectUpdated = {
        ...project,
        services: servicesUpdated,
        cost: parseFloat(project.cost) - parseFloat(cost)
      };
      setProject(projectUpdated);
      setServices(servicesUpdated);
      setMessage('Serviço removido com sucesso!');

      // Atualiza o custo total do projeto
      return fetch(`http://localhost:3000/projects/${projectUpdated.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cost: projectUpdated.cost
        })
      });
    });
  }
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, project.name ? /*#__PURE__*/React.createElement("div", {
    className: _ProjectModule.default.project_details
  }, /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "column"
  }, message && /*#__PURE__*/React.createElement(_Message.default, {
    type: type,
    msg: message
  }), /*#__PURE__*/React.createElement("div", {
    className: _ProjectModule.default.details_container
  }, /*#__PURE__*/React.createElement("h1", null, "Projeto: ", project.name), /*#__PURE__*/React.createElement("button", {
    className: _ProjectModule.default.btn,
    onClick: toggleProjectForm
  }, !showProjectForm ? 'Editar projeto' : 'Fechar'), !showProjectForm ? /*#__PURE__*/React.createElement("div", {
    className: _ProjectModule.default.form
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Categoria:"), " ", project.category.name), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Total do or\xE7amento:"), " R$", project.budget), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Total utilizado:"), " R$", project.cost)) : /*#__PURE__*/React.createElement("div", {
    className: _ProjectModule.default.form
  }, /*#__PURE__*/React.createElement(_ProjectForm.default, {
    handleSubmit: editPost,
    btnText: "Concluir Edi\xE7\xE3o",
    projectData: project
  }))), /*#__PURE__*/React.createElement("div", {
    className: _ProjectModule.default.service_form_container
  }, /*#__PURE__*/React.createElement("h2", null, "Adicione um servi\xE7o:"), /*#__PURE__*/React.createElement("button", {
    className: _ProjectModule.default.btn,
    onClick: toggleServiceForm
  }, !showServiceForm ? 'Adicionar Serviço' : 'Fechar'), /*#__PURE__*/React.createElement("div", {
    className: _ProjectModule.default.form
  }, showServiceForm && /*#__PURE__*/React.createElement(_ServiceForm.default, {
    handleSubmit: createService,
    btnText: "Adicionar Servi\xE7o",
    projectData: project
  }))), /*#__PURE__*/React.createElement("h2", null, "Servi\xE7os:"), /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "start"
  }, services.length > 0 && services.map(service => /*#__PURE__*/React.createElement(_ServiceCard.default, {
    id: service.id,
    name: service.name,
    cost: service.cost,
    description: service.description,
    key: service.id,
    handleRemove: removeService
  })), services.length === 0 && /*#__PURE__*/React.createElement("p", null, "N\xE3o h\xE1 servi\xE7os cadastrados.")))) : /*#__PURE__*/React.createElement(_Loading.default, null));
}
var _default = exports.default = Project;