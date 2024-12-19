"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callProcessHook = exports.callHook = exports.pluginSymbol = void 0;
const chalk_1 = __importDefault(require("chalk"));
const source_map_support_1 = __importDefault(require("source-map-support"));
source_map_support_1.default.install();
exports.pluginSymbol = Symbol.for('jsx-email/plugin');
const callHook = async ({ config, hookType, html }) => {
    for (const plugin of config.plugins) {
        const { log } = plugin;
        const hookFn = plugin[hookType];
        // eslint-disable-next-line no-await-in-loop, no-param-reassign
        if (hookFn)
            html = await hookFn({ chalk: chalk_1.default, html, log });
    }
    return html;
};
exports.callHook = callHook;
const callProcessHook = async ({ config, processor }) => {
    for (const { log, process } of config.plugins) {
        if (process) {
            // eslint-disable-next-line no-await-in-loop
            const pluggable = await process({ chalk: chalk_1.default, log });
            processor.use(pluggable);
        }
    }
};
exports.callProcessHook = callProcessHook;
//# sourceMappingURL=plugins.js.map