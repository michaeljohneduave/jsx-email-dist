"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const conditional_js_1 = require("./conditional.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/head' } : {};
const Head = ({ children, enableFormatDetection = false, ...props }) => ((0, jsx_runtime_1.jsxs)("head", { ...props, ...debugProps, children: [(0, jsx_runtime_1.jsx)("meta", { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=yes" }), (0, jsx_runtime_1.jsx)("meta", { name: "x-apple-disable-message-reformatting" }), !enableFormatDetection && ((0, jsx_runtime_1.jsx)("meta", { name: "format-detection", content: "telephone=no, date=no, address=no, email=no, url=no" })), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=yes" }), (0, jsx_runtime_1.jsx)("meta", { name: "x-apple-disable-message-reformatting" }), !enableFormatDetection && ((0, jsx_runtime_1.jsx)("meta", { name: "format-detection", content: "telephone=no, date=no, address=no, email=no, url=no" })), children, (0, jsx_runtime_1.jsx)(conditional_js_1.Conditional, { head: true, mso: true, children: 
            // prettier-ignore
            // @ts-expect-error: element don't exist
            (0, jsx_runtime_1.jsx)("xml", { children: (0, jsx_runtime_1.jsxs)("o:OfficeDocumentSettings", { children: [(0, jsx_runtime_1.jsx)("o:AllowPNG", {}), (0, jsx_runtime_1.jsx)("o:PixelsPerInch", { children: "96" })] }) }) })] }));
exports.Head = Head;
exports.Head.displayName = 'Head';
//# sourceMappingURL=head.js.map