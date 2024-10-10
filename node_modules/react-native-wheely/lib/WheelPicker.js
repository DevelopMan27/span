"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const WheelPicker_styles_1 = __importDefault(require("./WheelPicker.styles"));
const WheelPickerItem_1 = __importDefault(require("./WheelPickerItem"));
const WheelPicker = ({ selectedIndex, options, onChange, selectedIndicatorStyle = {}, containerStyle = {}, itemStyle = {}, itemTextStyle = {}, itemHeight = 40, scaleFunction = (x) => Math.pow(1.0, x), rotationFunction = (x) => 1 - Math.pow(1 / 2, x), opacityFunction = (x) => Math.pow(1 / 3, x), visibleRest = 2, decelerationRate = 'fast', containerProps = {}, flatListProps = {}, }) => {
    const flatListRef = (0, react_1.useRef)(null);
    const [scrollY] = (0, react_1.useState)(new react_native_1.Animated.Value(0));
    const containerHeight = (1 + visibleRest * 2) * itemHeight;
    const paddedOptions = (0, react_1.useMemo)(() => {
        const array = [...options];
        for (let i = 0; i < visibleRest; i++) {
            array.unshift(null);
            array.push(null);
        }
        return array;
    }, [options, visibleRest]);
    const offsets = (0, react_1.useMemo)(() => [...Array(paddedOptions.length)].map((x, i) => i * itemHeight), [paddedOptions, itemHeight]);
    const currentScrollIndex = (0, react_1.useMemo)(() => react_native_1.Animated.add(react_native_1.Animated.divide(scrollY, itemHeight), visibleRest), [visibleRest, scrollY, itemHeight]);
    const handleMomentumScrollEnd = (event) => {
        // Due to list bounciness when scrolling to the start or the end of the list
        // the offset might be negative or over the last item.
        // We therefore clamp the offset to the supported range.
        const offsetY = Math.min(itemHeight * (options.length - 1), Math.max(event.nativeEvent.contentOffset.y, 0));
        let index = Math.floor(Math.floor(offsetY) / itemHeight);
        const last = Math.floor(offsetY % itemHeight);
        if (last > itemHeight / 2)
            index++;
        if (index !== selectedIndex) {
            onChange(index);
        }
    };
    (0, react_1.useEffect)(() => {
        if (selectedIndex < 0 || selectedIndex >= options.length) {
            throw new Error(`Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`);
        }
    }, [selectedIndex, options]);
    /**
     * If selectedIndex is changed from outside (not via onChange) we need to scroll to the specified index.
     * This ensures that what the user sees as selected in the picker always corresponds to the value state.
     */
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
            index: selectedIndex,
            animated: false,
        });
    }, [selectedIndex]);
    return (react_1.default.createElement(react_native_1.View, Object.assign({ style: [WheelPicker_styles_1.default.container, { height: containerHeight }, containerStyle] }, containerProps),
        react_1.default.createElement(react_native_1.View, { style: [
                WheelPicker_styles_1.default.selectedIndicator,
                selectedIndicatorStyle,
                {
                    transform: [{ translateY: -itemHeight / 2 }],
                    height: itemHeight,
                },
            ] }),
        react_1.default.createElement(react_native_1.Animated.FlatList, Object.assign({}, flatListProps, { ref: flatListRef, style: WheelPicker_styles_1.default.scrollView, showsVerticalScrollIndicator: false, onScroll: react_native_1.Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true }), onMomentumScrollEnd: handleMomentumScrollEnd, snapToOffsets: offsets, decelerationRate: decelerationRate, initialScrollIndex: selectedIndex, getItemLayout: (data, index) => ({
                length: itemHeight,
                offset: itemHeight * index,
                index,
            }), data: paddedOptions, keyExtractor: (item, index) => index.toString(), renderItem: ({ item: option, index }) => (react_1.default.createElement(WheelPickerItem_1.default, { key: `option-${index}`, index: index, option: option, style: itemStyle, textStyle: itemTextStyle, height: itemHeight, currentScrollIndex: currentScrollIndex, scaleFunction: scaleFunction, rotationFunction: rotationFunction, opacityFunction: opacityFunction, visibleRest: visibleRest })) }))));
};
exports.default = WheelPicker;
