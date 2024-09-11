"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HorarioCardModule = _interopRequireDefault(require("../horario/HorarioCard.module.css"));
var _bs = require("react-icons/bs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ServiceCard(_ref) {
  let {
    id,
    name,
    cost,
    description,
    handleRemove
  } = _ref;
  const remove = e => {
    e.preventDefault();
    handleRemove(id, cost);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: _HorarioCardModule.default.horario_card
  }, /*#__PURE__*/React.createElement("h4", null, name), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Custo total:"), " R$", cost), /*#__PURE__*/React.createElement("p", null, description), /*#__PURE__*/React.createElement("div", {
    className: _HorarioCardModule.default.horario_card_actions
  }, /*#__PURE__*/React.createElement("button", {
    onClick: remove
  }, /*#__PURE__*/React.createElement(_bs.BsFillTrashFill, null), "Excluir")));
}
var _default = exports.default = ServiceCard;