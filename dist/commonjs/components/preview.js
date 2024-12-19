"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preview = exports.renderWhiteSpace = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/preview' } : {};
const maxLength = 150;
const renderWhiteSpace = (text) => {
    if (text.length >= maxLength)
        return null;
    const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';
    return (0, jsx_runtime_1.jsx)("div", { children: whiteSpaceCodes.repeat(maxLength - text.length) });
};
exports.renderWhiteSpace = renderWhiteSpace;
const Preview = ({ children = '', ...props }) => {
    const childText = Array.isArray(children) ? children.join('') : children;
    const text = String(childText ?? '').substring(0, maxLength);
    return ((0, jsx_runtime_1.jsxs)("div", { ...debugProps, "data-skip": "true", style: {
            display: 'none',
            lineHeight: '1px',
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: 'hidden'
        }, ...props, children: [text, (0, exports.renderWhiteSpace)(text)] }));
};
exports.Preview = Preview;
exports.Preview.displayName = 'Preview';
//# sourceMappingURL=preview.js.map