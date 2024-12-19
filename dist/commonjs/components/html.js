"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Html = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/html' } : {};
const Html = ({ children, lang = 'en', dir = 'ltr', enableVML = true, ...props }) => ((0, jsx_runtime_1.jsx)("html", { ...props, ...debugProps, lang: lang, dir: dir, ...(enableVML
        ? {
            'xmlns:o': 'urn:schemas-microsoft-com:office:office',
            'xmlns:v': 'urn:schemas-microsoft-com:vml'
        }
        : {}), children: children }));
exports.Html = Html;
exports.Html.displayName = 'Html';
//# sourceMappingURL=html.js.map