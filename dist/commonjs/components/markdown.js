"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const md_to_react_email_1 = require("md-to-react-email");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/markdown' } : {};
const Markdown = ({ children, markdownContainerStyles, markdownCustomStyles, ...props }) => {
    const parsedMarkdown = (0, md_to_react_email_1.parseMarkdownToJSX)({
        customStyles: markdownCustomStyles,
        markdown: children
    });
    return ((0, jsx_runtime_1.jsx)("div", { ...props, ...debugProps, style: markdownContainerStyles, dangerouslySetInnerHTML: { __html: parsedMarkdown } }));
};
exports.Markdown = Markdown;
exports.Markdown.displayName = 'Markdown';
//# sourceMappingURL=markdown.js.map