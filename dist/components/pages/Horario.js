"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _reactRouterDom = require("react-router-dom");
var _react = require("react");
var _HorarioModule = _interopRequireDefault(require("./Horario.module.css"));
var _Loading = _interopRequireDefault(require("../layout/Loading"));
var _Container = _interopRequireDefault(require("../layout/Container"));
var _HorarioForm = _interopRequireDefault(require("../horario/HorarioForm"));
var _Message = _interopRequireDefault(require("../layout/Message"));
var _ServiceForm = _interopRequireDefault(require("../service/ServiceForm"));
var _ServiceCard = _interopRequireDefault(require("../service/ServiceCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Horario.js

function Horario() {
  const {
    id
  } = (0, _reactRouterDom.useParams)();
  const [horario, setHorario] = (0, _react.useState)({});
  const [showHorarioForm, setShowHorarioForm] = (0, _react.useState)(false);
  const [showServiceForm, setShowServiceForm] = (0, _react.useState)(false);
  const [services, setServices] = (0, _react.useState)([]);
  const [message, setMessage] = (0, _react.useState)('');
  const [type, setType] = (0, _react.useState)('success');
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/horarios/${id}`);
        const data = await response.json();
        if (data) {
          setHorario(data);
          setServices(data.services || []);
        } else {
          setMessage('Horário não encontrado!');
          setType('error');
        }
      } catch (error) {
        console.error("Erro ao buscar horário:", error);
      }
    };
    fetchData();
  }, [id]);
  const editPost = async updatedHorario => {
    if (updatedHorario.budget < updatedHorario.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }
    try {
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHorario)
      });
      setHorario(updatedHorario);
      setShowHorarioForm(false);
      setMessage('Projeto atualizado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao atualizar horário:", error);
    }
  };
  const createService = async newService => {
    const service = {
      ...newService,
      id: (0, _uuid.v4)(),
      horario_id: id
    };
    const newCost = parseFloat(horario.cost) + parseFloat(service.cost);
    if (newCost > parseFloat(horario.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('error');
      return false;
    }
    try {
      const updatedServices = [...services, service];
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          services: updatedServices,
          cost: newCost
        })
      });
      setServices(updatedServices);
      setHorario({
        ...horario,
        cost: newCost
      });
      setShowServiceForm(false);
      setMessage('Serviço adicionado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }
  };
  const removeService = async (serviceId, cost) => {
    try {
      const updatedServices = services.filter(service => service.id !== serviceId);
      const newCost = parseFloat(horario.cost) - parseFloat(cost);
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          services: updatedServices,
          cost: newCost
        })
      });
      setServices(updatedServices);
      setHorario({
        ...horario,
        cost: newCost
      });
      setMessage('Serviço removido com sucesso!');
      setType('success');
    } catch (error) {
      console.error("Erro ao remover serviço:", error);
    }
  };
  const toggleHorarioForm = () => {
    setShowHorarioForm(!showHorarioForm);
  };
  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, horario.name ? /*#__PURE__*/React.createElement("div", {
    className: _HorarioModule.default.horario_details
  }, /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "column"
  }, message && /*#__PURE__*/React.createElement(_Message.default, {
    type: type,
    msg: message
  }), /*#__PURE__*/React.createElement("div", {
    className: _HorarioModule.default.details_container
  }, /*#__PURE__*/React.createElement("h1", null, "Projeto: ", horario.name), /*#__PURE__*/React.createElement("button", {
    className: _HorarioModule.default.btn,
    onClick: toggleHorarioForm
  }, !showHorarioForm ? 'Editar projeto' : 'Fechar'), !showHorarioForm ? /*#__PURE__*/React.createElement("div", {
    className: _HorarioModule.default.form
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Categoria:"), " ", horario.category.name), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Total do or\xE7amento:"), " R$", horario.budget), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Total utilizado:"), " R$", horario.cost)) : /*#__PURE__*/React.createElement("div", {
    className: _HorarioModule.default.form
  }, /*#__PURE__*/React.createElement(_HorarioForm.default, {
    handleSubmit: editPost,
    btnText: "Concluir Edi\xE7\xE3o",
    horarioData: horario
  }))), /*#__PURE__*/React.createElement("div", {
    className: _HorarioModule.default.service_form_container
  }, /*#__PURE__*/React.createElement("h2", null, "Adicione um servi\xE7o:"), /*#__PURE__*/React.createElement("button", {
    className: _HorarioModule.default.btn,
    onClick: toggleServiceForm
  }, !showServiceForm ? 'Adicionar Serviço' : 'Fechar'), /*#__PURE__*/React.createElement("div", {
    className: _HorarioModule.default.form
  }, showServiceForm && /*#__PURE__*/React.createElement(_ServiceForm.default, {
    handleSubmit: createService,
    btnText: "Adicionar Servi\xE7o",
    horarioData: horario
  }))), /*#__PURE__*/React.createElement("h2", null, "Servi\xE7os:"), /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "start"
  }, services.length > 0 ? services.map(service => /*#__PURE__*/React.createElement(_ServiceCard.default, {
    id: service.id,
    name: service.name,
    cost: service.cost,
    description: service.description,
    key: service.id,
    handleRemove: removeService
  })) : /*#__PURE__*/React.createElement("p", null, "N\xE3o h\xE1 servi\xE7os cadastrados.")))) : /*#__PURE__*/React.createElement(_Loading.default, null));
}
var _default = exports.default = Horario;