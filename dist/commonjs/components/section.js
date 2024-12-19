"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/section' } : {};
const Section = ({ children, style, ...props }) => ((0, jsx_runtime_1.jsx)("table", { align: "center", width: "100%", ...props, ...debugProps, style: style, border: 0, cellPadding: "0", cellSpacing: "0", role: "presentation", children: (0, jsx_runtime_1.jsx)("tbody", { children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { children: children }) }) }) }));
exports.Section = Section;
exports.Section.displayName = 'Section';
//# sourceMappingURL=section.js.map