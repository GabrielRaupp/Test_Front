"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _InputModule = _interopRequireDefault(require("./Input.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Input(_ref) {
  let {
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: _InputModule.default.form_control
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, text, ":"), /*#__PURE__*/React.createElement("input", {
    type: type,
    name: name,
    id: name,
    placeholder: placeholder,
    onChange: handleOnChange,
    value: value
  }));
}
var _default = exports.default = Input;