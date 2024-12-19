"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.getPluginLog = void 0;
const log_1 = require("@dot/log");
const chalk_1 = __importDefault(require("chalk"));
const getPluginLog = (name) => (0, log_1.getLog)({ brand: 'jsx-email', name: (0, chalk_1.default) `{bold ∵ ${name}}` });
exports.getPluginLog = getPluginLog;
exports.log = (0, log_1.getLog)({ brand: 'jsx-email' });
//# sourceMappingURL=log.js.map