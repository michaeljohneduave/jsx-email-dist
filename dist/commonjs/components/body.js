"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/body' } : {};
const Body = ({ children, style, ...props }) => ((0, jsx_runtime_1.jsx)("body", { ...props, ...debugProps, style: style, children: children }));
exports.Body = Body;
exports.Body.displayName = 'Body';
//# sourceMappingURL=body.js.map