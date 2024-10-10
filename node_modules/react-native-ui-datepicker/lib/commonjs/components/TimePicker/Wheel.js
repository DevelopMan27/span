"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Wheel;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _WheelNative = _interopRequireDefault(require("./WheelNative"));
var _WheelWeb = _interopRequireDefault(require("./WheelWeb"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Wheel(props) {
  return _reactNative.Platform.OS === 'web' ? /*#__PURE__*/_react.default.createElement(_WheelWeb.default, props) : /*#__PURE__*/_react.default.createElement(_WheelNative.default, props);
}
//# sourceMappingURL=Wheel.js.map