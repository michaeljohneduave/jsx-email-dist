"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tailwind = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const magic_string_1 = __importDefault(require("magic-string"));
const postcss_1 = __importDefault(require("postcss"));
// @ts-ignore
// Note: https://github.com/csstools/postcss-plugins/issues/1217
const postcss_var_replace_1 = require("postcss-var-replace");
const react_1 = require("react");
const debug_js_1 = require("../../debug.js");
const log_js_1 = require("../../log.js");
const jsx_to_string_js_1 = require("../../renderer/jsx-to-string.js");
const suspense_js_1 = require("../../renderer/suspense.js");
const color_functions_js_1 = require("./color-functions.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/tailwind' } : {};
const getUno = async (config, production) => {
    // @ts-ignore
    const { createGenerator } = await import('@unocss/core');
    // @ts-ignore
    const { presetTypography } = await import('@unocss/preset-typography');
    // @ts-ignore
    const { presetWind } = await import('@unocss/preset-wind');
    // @ts-ignore
    const { presetUno } = await import('@unocss/preset-uno');
    // @ts-ignore
    const { presetRemToPx } = await import('@unocss/preset-rem-to-px');
    // @ts-ignore
    const { default: transformerCompileClass } = await import('@unocss/transformer-compile-class');
    // @ts-ignore
    const { default: transformerVariantGroup } = await import('@unocss/transformer-variant-group');
    const transformers = [transformerVariantGroup()];
    if (production)
        transformers.push(transformerCompileClass({
            classPrefix: 'je-',
            trigger: ':jsx:'
        }));
    if (config?.theme?.extend) {
        log_js_1.log.warn('Tailwind: Use of `theme.extend` is not necessary. `theme.extend` has been merged into `theme`');
        const { extend } = config.theme;
        delete config.theme.extend;
        config.theme = { ...config.theme, ...extend };
    }
    const presets = [
        ...(config.presets || []),
        // Convert all `rem` values to `px`
        presetRemToPx(),
        presetTypography(),
        presetUno({ dark: 'media' }),
        presetWind()
    ];
    const uno = await createGenerator({
        ...config,
        presets,
        transformers
    });
    return uno;
};
const render = async ({ children, config = {}, production = false }) => {
    const uno = await getUno(config, production);
    const html = await (0, jsx_to_string_js_1.jsxToString)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
    const code = production ? html.replace(/class="/g, 'class=":jsx: ') : html;
    const s = new magic_string_1.default(code);
    const invalidate = () => 0;
    for (const transformer of uno.config.transformers || []) {
        // eslint-disable-next-line no-await-in-loop
        await transformer.transform(s, 'Tailwind', { invalidate, tokens: new Set(), uno });
    }
    const finalHtml = s.toString();
    const result = await uno.generate(finalHtml);
    // Note: Remove css variables, replace them with static values. It's not ideal to run PostCSS
    // after using Uno, but it's pretty quick. Uno doesn't have a transformer that can match this,
    // and it's crucial for email client support (e.g. Gmail)
    const { css } = (0, postcss_1.default)([
        (0, postcss_var_replace_1.postcssVarReplace)({ preserveAtRulesOrder: true }),
        (0, color_functions_js_1.plugin)()
    ]).process(result.css);
    const styleTag = `<style tailwind>${css}</style>`;
    return `${finalHtml}${styleTag}`;
};
const Renderer = (props) => {
    const html = (0, suspense_js_1.useData)(props, () => render(props));
    return (0, jsx_runtime_1.jsx)("head", { ...debugProps, dangerouslySetInnerHTML: { __html: html } });
};
const Tailwind = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "waiting" }), children: (0, jsx_runtime_1.jsx)(Renderer, { ...props, children: children }) }) }));
exports.Tailwind = Tailwind;
//# sourceMappingURL=tailwind.js.map