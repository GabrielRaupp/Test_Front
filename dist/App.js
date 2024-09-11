"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _Footer = _interopRequireDefault(require("./components/layout/Footer"));
var _Navbar = _interopRequireDefault(require("./components/layout/Navbar"));
var _Container = _interopRequireDefault(require("./components/layout/Container"));
var _Home = _interopRequireDefault(require("./components/pages/Home"));
var _Horarios = _interopRequireDefault(require("./components/pages/Horarios"));
var _NewHorario = _interopRequireDefault(require("./components/pages/NewHorario"));
var _Company = _interopRequireDefault(require("./components/pages/Company"));
var _Contact = _interopRequireDefault(require("./components/pages/Contact"));
var _Horario = _interopRequireDefault(require("./components/pages/Horario"));
var _SingUp = _interopRequireDefault(require("./components/pages/SingUp"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  return /*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_Navbar.default, null), /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "min-height"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(_Home.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/horarios",
    element: /*#__PURE__*/React.createElement(_Horarios.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/company",
    element: /*#__PURE__*/React.createElement(_Company.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/contact",
    element: /*#__PURE__*/React.createElement(_Contact.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/newhorario",
    element: /*#__PURE__*/React.createElement(_NewHorario.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/horario/:id",
    element: /*#__PURE__*/React.createElement(_Horario.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/singup",
    element: /*#__PURE__*/React.createElement(_SingUp.default, null)
  }))), /*#__PURE__*/React.createElement(_Footer.default, null));
}
var _default = exports.default = App;