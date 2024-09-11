"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _HorarioForm = _interopRequireDefault(require("../horario/HorarioForm"));
var _NewHorarioModule = _interopRequireDefault(require("./NewHorario.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function NewHorario() {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const createPost = async horario => {
    horario.cost = 0;
    horario.services = [];
    try {
      await fetch('http://localhost:3000/horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(horario)
      });
      navigate('/horarios', {
        state: {
          message: 'Projeto criado com sucesso!'
        }
      });
    } catch (error) {
      console.error("Erro ao criar horário:", error);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: _NewHorarioModule.default.newhorario_container
  }, /*#__PURE__*/React.createElement("h1", null, "Criar Hor\xE1rio"), /*#__PURE__*/React.createElement("p", null, "Crie seu hor\xE1rio para depois adicionar os servi\xE7os"), /*#__PURE__*/React.createElement(_HorarioForm.default, {
    handleSubmit: createPost,
    btnText: "Criar Hor\xE1rio"
  }));
}
var _default = exports.default = NewHorario;