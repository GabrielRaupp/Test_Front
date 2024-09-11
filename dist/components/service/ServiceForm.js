"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ServiceFromModule = _interopRequireDefault(require("./ServiceFrom.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Importa React e useState

function ServiceForm(_ref) {
  let {
    handleSubmit,
    btnText,
    horarioData
  } = _ref;
  const [service, setService] = (0, _react.useState)({
    name: '',
    cost: '',
    description: ''
  });
  function handleChange(event) {
    const {
      name,
      value
    } = event.target;
    setService({
      ...service,
      [name]: value
    });
  }
  function onSubmit(event) {
    event.preventDefault();
    handleSubmit(service);
    setService({
      name: '',
      cost: '',
      description: ''
    });
  }
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: onSubmit,
    className: _ServiceFromModule.default.form
  }, /*#__PURE__*/_react.default.createElement("label", null, "Nome:", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: "name",
    value: service.name,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("label", null, "Custo:", /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    name: "cost",
    value: service.cost,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("label", null, "Descri\xE7\xE3o:", /*#__PURE__*/_react.default.createElement("textarea", {
    name: "description",
    value: service.description,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, btnText));
}
var _default = exports.default = ServiceForm;