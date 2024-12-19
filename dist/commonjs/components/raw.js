"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raw = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const raw_js_1 = require("../renderer/raw.js");
const Raw = (props) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("jsx-email-raw", { "data-skip": props.disablePlainTextOutput ? 'true' : void 0, dangerouslySetInnerHTML: { __html: `<!--${(0, raw_js_1.escapeForRawComponent)(props.content)}-->` } }) }));
exports.Raw = Raw;
exports.Raw.displayName = 'Raw';
//# sourceMappingURL=raw.js.map