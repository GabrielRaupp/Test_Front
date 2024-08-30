"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ContainerModule = _interopRequireDefault(require("./Container.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Container(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: `${_ContainerModule.default.container} ${_ContainerModule.default[props.customClass]}`
  }, props.children);
}
var _default = exports.default = Container;