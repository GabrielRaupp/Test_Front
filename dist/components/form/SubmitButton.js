"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SubmitButtonModule = _interopRequireDefault(require("./SubmitButton.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SubmitButton(_ref) {
  let {
    text
  } = _ref;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: _SubmitButtonModule.default.btn
  }, text));
}
var _default = exports.default = SubmitButton;