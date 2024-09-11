"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _HorarioCardModule = _interopRequireDefault(require("./HorarioCard.module.css"));
var _bs = require("react-icons/bs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function HorarioCard(_ref) {
  let {
    id,
    name,
    budget,
    category,
    handleRemove
  } = _ref;
  const remove = e => {
    e.preventDefault();
    handleRemove(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: _HorarioCardModule.default.horario_card
  }, /*#__PURE__*/React.createElement("h4", null, name), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, "Or\xE7amento:"), " R$", budget), /*#__PURE__*/React.createElement("p", {
    className: _HorarioCardModule.default.category_text
  }, /*#__PURE__*/React.createElement("span", {
    className: `${_HorarioCardModule.default[category.toLowerCase()]}`
  }), " ", category), /*#__PURE__*/React.createElement("div", {
    className: _HorarioCardModule.default.horario_card_actions
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: '/horario/' + id
  }, /*#__PURE__*/React.createElement(_bs.BsPencil, null), " Editar"), /*#__PURE__*/React.createElement("button", {
    onClick: remove
  }, /*#__PURE__*/React.createElement(_bs.BsFillTrashFill, null), "Excluir")));
}
var _default = exports.default = HorarioCard;