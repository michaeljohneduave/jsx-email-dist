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
exports.Row = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const config = __importStar(require("../config.js"));
const debug_js_1 = require("../debug.js");
const log_js_1 = require("../log.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/row' } : {};
const Row = ({ children, disableDefaultStyle, style, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    if (props.cellPadding || props.cellSpacing) {
        log_js_1.log.warn('Use of the `cellPadding` and `cellSpacing` properties are discouraged due to inconsistencies between email clients');
    }
    return ((0, jsx_runtime_1.jsx)("table", { align: "center", width: "100%", style: style, role: "presentation", cellSpacing: "0", cellPadding: "0", border: 0, ...props, ...debugProps, children: (0, jsx_runtime_1.jsx)("tbody", { style: configDds || disableDefaultStyle ? {} : { width: '100%' }, children: (0, jsx_runtime_1.jsx)("tr", { style: configDds || disableDefaultStyle ? {} : { width: '100%' }, children: children }) }) }));
};
exports.Row = Row;
exports.Row.displayName = 'Row';
//# sourceMappingURL=row.js.map