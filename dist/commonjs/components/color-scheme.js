"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorScheme = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ColorScheme = ({ mode = 'normal' }) => {
    const style = `:root { color-scheme: ${mode}; supported-color-schemes: ${mode}; }`;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("meta", { name: "color-scheme", content: mode }), (0, jsx_runtime_1.jsx)("meta", { name: "supported-color-schemes", content: mode }), (0, jsx_runtime_1.jsx)("style", { dangerouslySetInnerHTML: { __html: style } })] }));
};
exports.ColorScheme = ColorScheme;
exports.ColorScheme.displayName = 'ColorScheme';
//# sourceMappingURL=color-scheme.js.map