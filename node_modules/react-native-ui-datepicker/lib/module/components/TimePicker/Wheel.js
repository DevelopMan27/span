import React from 'react';
import { Platform } from 'react-native';
import WheelNative from './WheelNative';
import WheelWeb from './WheelWeb';
export default function Wheel(props) {
  return Platform.OS === 'web' ? /*#__PURE__*/React.createElement(WheelWeb, props) : /*#__PURE__*/React.createElement(WheelNative, props);
}
//# sourceMappingURL=Wheel.js.map