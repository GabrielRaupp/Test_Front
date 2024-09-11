"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _MessageModule = _interopRequireDefault(require("./Message.module.css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Message(_ref) {
  let {
    type,
    msg
  } = _ref;
  const [visible, setVisible] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!msg) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible && /*#__PURE__*/React.createElement("div", {
    className: `${_MessageModule.default.message} ${_MessageModule.default[type]}`
  }, msg));
}
var _default = exports.default = Message;