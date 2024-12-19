"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/graph' } : {};
const Graph = ({ config, title, width, height, background, className }) => {
    const baseURL = 'https://quickchart.io/chart';
    let url = `${baseURL}?c=${encodeURIComponent(JSON.stringify(config))}`;
    if (width) {
        url += `&w=${width}`;
    }
    if (height) {
        url += `&h=${height}`;
    }
    if (background) {
        url += `&bkg=${background}`;
    }
    return ((0, jsx_runtime_1.jsx)("img", { ...debugProps, className: className, src: url, alt: title, width: width, height: height }));
};
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map