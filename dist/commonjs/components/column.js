"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/column' } : {};
const Column = ({ children, bgColor, bgImage, style, ...props }) => ((0, jsx_runtime_1.jsx)("td", { 
    // @ts-expect-error: `background` and `bgcolor` not documented
    background: bgImage, bgcolor: bgColor, ...props, ...debugProps, style: style, children: children }));
exports.Column = Column;
exports.Column.displayName = 'Column';
//# sourceMappingURL=column.js.map