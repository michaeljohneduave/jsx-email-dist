"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const debug_js_1 = require("../debug.js");
const jsx_to_string_js_1 = require("../renderer/jsx-to-string.js");
const suspense_js_1 = require("../renderer/suspense.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/background' } : {};
const Renderer = (props) => {
    const { children, width, height, bgColor, src, bgRepeat } = props;
    const html = (0, suspense_js_1.useData)(props, () => (0, jsx_to_string_js_1.jsxToString)((0, jsx_runtime_1.jsx)("div", { children: children })));
    const innerHtml = `
<!--[if gte mso 9]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="${!width ? 'mso-width-percent:1000;' : `width:${width}px;`}${height ? `height:${height}px;` : ''}"><v:fill type="${bgRepeat === 'repeat' ? 'tile' : 'frame'}" src="${src}" ${bgColor ? `color="${bgColor}"` : ''}/><v:textbox${!height ? ' style="mso-fit-shape-to-text:true"' : ''} inset="0,0,0,0"><![endif]-->
${html}
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->`;
    // @ts-ignore
    // Note: This is perfectly valid. TS just expects lowercase tag names to match a specific type
    return (0, jsx_runtime_1.jsx)("jsx-email-cond", { dangerouslySetInnerHTML: { __html: innerHtml } });
};
const Background = (props) => {
    const { src, bgColor, width, height, children, style, bgRepeat = 'no-repeat', ...rest } = props;
    return ((0, jsx_runtime_1.jsx)("table", { ...debugProps, cellPadding: 0, cellSpacing: 0, border: 0, width: '100%', ...(height && { height }), role: "presentation", children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { valign: "top", ...(width && { width }), ...(height && width && { height }), 
                // @ts-expect-error
                background: src, style: { backgroundRepeat: bgRepeat, ...style }, ...(bgColor && { bgcolor: bgColor }), ...rest, children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "waiting..." }), children: (0, jsx_runtime_1.jsx)(Renderer, { ...props, children: children }) }) }) }) }));
};
exports.Background = Background;
//# sourceMappingURL=background.js.map