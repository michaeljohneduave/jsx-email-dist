"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const debug_js_1 = require("../debug.js");
const suspense_js_1 = require("../renderer/suspense.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/code' } : {};
const Renderer = (props) => {
    const { children, language, style, theme = 'nord', ...rest } = props;
    const code = children;
    const highlight = async () => {
        // Note: When building CJS with thsy, tsc thinks that this isn't already dynamic
        // @ts-ignore
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, { lang: language, theme });
        return html;
    };
    const html = (0, suspense_js_1.useData)(props, highlight);
    return (0, jsx_runtime_1.jsx)("div", { ...rest, ...debugProps, style: style, dangerouslySetInnerHTML: { __html: html } });
};
const Code = ({ children, ...props }) => {
    if (typeof children !== 'string')
        throw new Error('Code: component children must be of type string');
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "waiting" }), children: (0, jsx_runtime_1.jsx)(Renderer, { ...props, children: children }) }) }));
};
exports.Code = Code;
exports.Code.displayName = 'Code';
//# sourceMappingURL=code.js.map