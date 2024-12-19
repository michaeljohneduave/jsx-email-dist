"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.replacer = exports.reReplace = exports.reFunction = void 0;
exports.reFunction = /((rgb|hsl)a?)\(\s*(\d+)\s*(\d+)\s*(\d+)(?:\s*\/\s*([\d%.]+))?\s*\)/i;
exports.reReplace = new RegExp(exports.reFunction.source, 'gi');
const replacer = (_, name, __, r, g, b, a) => {
    const values = [r, g, b, !!a && a !== '1' ? a : ''].filter(Boolean).join(',');
    return `${name}(${values})`;
};
exports.replacer = replacer;
const plugin = () => {
    return {
        Declaration: (decl) => {
            const { value } = decl;
            if (!exports.reFunction.test(value))
                return;
            const replaced = value.replaceAll(exports.reReplace, exports.replacer);
            if (value === replaced)
                return;
            decl.cloneBefore({ value: replaced });
            decl.remove();
        },
        postcssPlugin: 'jsx-color-functions'
    };
};
exports.plugin = plugin;
exports.plugin.postcss = true;
//# sourceMappingURL=color-functions.js.map