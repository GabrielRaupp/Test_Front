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
var _Projects = _interopRequireDefault(require("./components/pages/Projects"));
var _NewProject = _interopRequireDefault(require("./components/pages/NewProject"));
var _Company = _interopRequireDefault(require("./components/pages/Company"));
var _Contact = _interopRequireDefault(require("./components/pages/Contact"));
var _Project = _interopRequireDefault(require("./components/pages/Project"));
var _SingUp = _interopRequireDefault(require("./components/pages/SingUp"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  return /*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_Navbar.default, null), /*#__PURE__*/React.createElement(_Container.default, {
    customClass: "min-height"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: _Home.default
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/projects",
    component: _Projects.default
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/company",
    component: _Company.default
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/contact",
    component: _Contact.default
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/newproject",
    component: _NewProject.default
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/project/:id",
    component: _Project.default
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/singup",
    component: _SingUp.default
  }))), /*#__PURE__*/React.createElement(_Footer.default, null));
}
var _default = exports.default = App;