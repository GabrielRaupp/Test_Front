"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _loading = _interopRequireDefault(require("../../img/loading.svg"));
var _LoadingModule = _interopRequireDefault(require("./Loading.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Loading() {
  return /*#__PURE__*/React.createElement("div", {
    className: _LoadingModule.default.loader_container
  }, /*#__PURE__*/React.createElement("img", {
    className: _LoadingModule.default.loader,
    src: _loading.default,
    alt: "Loading"
  }));
}
var _default = exports.default = Loading;