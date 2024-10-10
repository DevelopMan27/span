"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    container: {
        position: 'relative',
    },
    selectedIndicator: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'hsl(200, 8%, 94%)',
        borderRadius: 5,
        top: '50%',
    },
    scrollView: {
        overflow: 'hidden',
        flex: 1,
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        zIndex: 100,
    },
});
