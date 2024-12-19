"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditional = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const jsx_to_string_js_1 = require("../renderer/jsx-to-string.js");
const suspense_js_1 = require("../renderer/suspense.js");
const notMso = (html) => `<!--[if !mso]><!-->${html}<!--<![endif]-->`;
const comment = (expression, html) => `<!--[if ${expression}]>${html}<![endif]-->`;
const Renderer = (props) => {
    const { children, mso, head } = props;
    let { expression } = props;
    const html = (0, suspense_js_1.useData)(props, () => (0, jsx_to_string_js_1.jsxToString)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children })));
    let innerHtml = '';
    if (mso === false)
        innerHtml = notMso(html);
    else if (mso === true && !expression)
        expression = 'mso';
    if (expression)
        innerHtml = comment(expression, html);
    const Component = head ? 'head' : 'jsx-email-cond';
    // @ts-ignore
    // Note: This is perfectly valid. TS just expects lowercase tag names to match a specific type
    return (0, jsx_runtime_1.jsx)(Component, { dangerouslySetInnerHTML: { __html: innerHtml } });
};
const Conditional = (props) => {
    const { children, expression, mso } = props;
    if (typeof expression === 'undefined' && typeof mso === 'undefined')
        throw new RangeError('jsx-email: Conditional expects the `expression` or `mso` prop to be defined');
    if (typeof expression !== 'undefined' && typeof mso !== 'undefined')
        throw new RangeError('jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both');
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "waiting" }), children: (0, jsx_runtime_1.jsx)(Renderer, { ...props, children: children }) }) }));
};
exports.Conditional = Conditional;
exports.Conditional.displayName = 'Conditional';
//# sourceMappingURL=conditional.js.map