"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = exports.withMargin = exports.withSpace = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_slot_1 = require("@radix-ui/react-slot");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/heading' } : {};
const withSpace = (value, properties) => properties.reduce((styles, property) => {
    // Check to ensure string value is a valid number
    if (!isNaN(parseFloat(value))) {
        return { ...styles, [property]: `${value}px` };
    }
    return styles;
}, {});
exports.withSpace = withSpace;
const withMargin = (props) => {
    const nonEmptyStyles = [
        (0, exports.withSpace)(props.m, ['margin']),
        (0, exports.withSpace)(props.mx, ['marginLeft', 'marginRight']),
        (0, exports.withSpace)(props.my, ['marginTop', 'marginBottom']),
        (0, exports.withSpace)(props.mt, ['marginTop']),
        (0, exports.withSpace)(props.mr, ['marginRight']),
        (0, exports.withSpace)(props.mb, ['marginBottom']),
        (0, exports.withSpace)(props.ml, ['marginLeft'])
    ].filter((s) => Object.keys(s).length);
    const mergedStyles = nonEmptyStyles.reduce((acc, style) => {
        return { ...acc, ...style };
    }, {});
    return mergedStyles;
};
exports.withMargin = withMargin;
const Heading = ({ as: Tag = 'h1', children, style, m, mx, my, mt, mr, mb, ml, ...props }) => ((0, jsx_runtime_1.jsx)(react_slot_1.Slot, { ...props, ...debugProps, style: { ...(0, exports.withMargin)({ m, mb, ml, mr, mt, mx, my }), ...style }, children: (0, jsx_runtime_1.jsx)(Tag, { children: children }) }));
exports.Heading = Heading;
exports.Heading.displayName = 'Heading';
//# sourceMappingURL=heading.js.map