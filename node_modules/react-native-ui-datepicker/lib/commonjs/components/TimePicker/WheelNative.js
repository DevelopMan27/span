"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WheelNative;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeWheely = _interopRequireDefault(require("react-native-wheely"));
var _CalendarContext = require("../../CalendarContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function WheelNative({
  value,
  setValue = () => {},
  items
}) {
  const {
    theme
  } = (0, _CalendarContext.useCalendarContext)();
  return /*#__PURE__*/_react.default.createElement(_reactNativeWheely.default, {
    selectedIndex: value,
    options: items,
    onChange: setValue,
    containerStyle: {
      ...styles.container,
      ...(theme === null || theme === void 0 ? void 0 : theme.timePickerContainerStyle)
    },
    itemTextStyle: {
      ...styles.timePickerText,
      ...(theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle)
    },
    selectedIndicatorStyle: {
      ...(theme === null || theme === void 0 ? void 0 : theme.timePickerIndicatorStyle)
    },
    itemHeight: 45,
    decelerationRate: theme === null || theme === void 0 ? void 0 : theme.timePickerDecelerationRate
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    display: 'flex',
    ..._reactNative.Platform.select({
      web: {
        userSelect: 'none'
      }
    })
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
//# sourceMappingURL=WheelNative.js.map