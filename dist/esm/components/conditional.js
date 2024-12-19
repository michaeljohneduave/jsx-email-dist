import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { jsxToString } from '../renderer/jsx-to-string.js';
import { useData } from '../renderer/suspense.js';
const notMso = (html) => `<!--[if !mso]><!-->${html}<!--<![endif]-->`;
const comment = (expression, html) => `<!--[if ${expression}]>${html}<![endif]-->`;
const Renderer = (props) => {
    const { children, mso, head } = props;
    let { expression } = props;
    const html = useData(props, () => jsxToString(_jsx(_Fragment, { children: children })));
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
    return _jsx(Component, { dangerouslySetInnerHTML: { __html: innerHtml } });
};
export const Conditional = (props) => {
    const { children, expression, mso } = props;
    if (typeof expression === 'undefined' && typeof mso === 'undefined')
        throw new RangeError('jsx-email: Conditional expects the `expression` or `mso` prop to be defined');
    if (typeof expression !== 'undefined' && typeof mso !== 'undefined')
        throw new RangeError('jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both');
    return (_jsx(_Fragment, { children: _jsx(Suspense, { fallback: _jsx("div", { children: "waiting" }), children: _jsx(Renderer, { ...props, children: children }) }) }));
};
Conditional.displayName = 'Conditional';
//# sourceMappingURL=conditional.js.map