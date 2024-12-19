"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const config = __importStar(require("../config.js"));
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/img' } : {};
const Img = ({ alt, disableDefaultStyle, height, src, style, width, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    return ((0, jsx_runtime_1.jsx)("img", { ...props, ...debugProps, alt: alt, src: src, width: width, height: height, style: {
            ...(configDds || disableDefaultStyle
                ? {}
                : { border: 'none', display: 'block', outline: 'none', textDecoration: 'none' }),
            ...style
        } }));
};
exports.Img = Img;
exports.Img.displayName = 'Img';
//# sourceMappingURL=img.js.map