"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _Container = _interopRequireDefault(require("../layout/Container"));
var _Loading = _interopRequireDefault(require("../layout/Loading"));
var _LinkButton = _interopRequireDefault(require("../layout/LinkButton"));
var _HorarioCard = _interopRequireDefault(require("../horario/HorarioCard"));
var _Message = _interopRequireDefault(require("../layout/Message"));
var _HorariosModule = _interopRequireDefault(require("./Horarios.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Horarios() {
  const [horarios, setHorarios] = (0, _react.useState)([]);
  const [removeLoading, setRemoveLoading] = (0, _react.useState)(false);
  const [horarioMessage, setHorarioMessage] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/horarios');
        const data = await response.json();
        setHorarios(data);
        setRemoveLoading(true);
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
      }
    };
    fetchData();
  }, []);
  const removeHorario = async id => {
    try {
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setHorarios(horarios.filter(horario => horario._id !== id));
      setHorarioMessage('Horário removido com sucesso!');
    } catch (error) {
      console.error("Erro ao remover horário:", error);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: _HorariosModule.default.horario_container
  }, /*#__PURE__*/React.createElement("div", {
    className: _HorariosModule.default.title_container
  }, /*#__PURE__*/React.createElement("h1", null, "Meus Hor\xE1rios"), /*#__PURE__*/React.createElement(_LinkButton.default, {
    to: "/newhorario",
    text: "Montar hor\xE1rio"
  })), horarioMessage && /*#__PURE__*/React.createElement(_Message.default, {
    type: "success",
    msg: horarioMessage
  }), /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "start"
  }, horarios.length > 0 && horarios.map(horario => /*#__PURE__*/React.createElement(_HorarioCard.default, {
    id: horario._id,
    name: horario.name,
    budget: horario.budget,
    category: horario.category.name,
    key: horario._id,
    handleRemove: removeHorario
  })), !removeLoading && /*#__PURE__*/React.createElement(_Loading.default, null), removeLoading && horarios.length === 0 && /*#__PURE__*/React.createElement("p", null, "N\xE3o h\xE1 hor\xE1rios cadastrados!")));
}
var _default = exports.default = Horarios;