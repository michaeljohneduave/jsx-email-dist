"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = exports.debug = void 0;
const debug_1 = __importDefault(require("debug"));
exports.d = debug_1.default;
exports.debug = {
    cli: (0, debug_1.default)('jsx-email:cli'),
    elements: (0, debug_1.default)('jsx-email:elements')
};
//# sourceMappingURL=debug.js.map