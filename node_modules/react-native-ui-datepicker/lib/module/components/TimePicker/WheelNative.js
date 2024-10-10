import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import WheelPicker from 'react-native-wheely';
import { useCalendarContext } from '../../CalendarContext';
export default function WheelNative({
  value,
  setValue = () => {},
  items
}) {
  const {
    theme
  } = useCalendarContext();
  return /*#__PURE__*/React.createElement(WheelPicker, {
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
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    ...Platform.select({
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