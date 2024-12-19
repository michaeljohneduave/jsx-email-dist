"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.renderPlainText = exports.jsxEmailTags = void 0;
const html_to_text_1 = require("html-to-text");
const config_js_1 = require("../config.js");
const plugins_js_1 = require("../plugins.js");
const jsx_to_string_js_1 = require("./jsx-to-string.js");
const move_style_js_1 = require("./move-style.js");
const raw_js_1 = require("./raw.js");
exports.jsxEmailTags = ['jsx-email-cond'];
const renderPlainText = async (component, options) => {
    const { formatters, selectors } = options || {};
    const result = await (0, jsx_to_string_js_1.jsxToString)(component);
    return (0, html_to_text_1.htmlToText)(result, {
        formatters: {
            raw: (elem, _walk, builder) => {
                if (elem.children.length && elem.children[0].type === 'comment') {
                    builder.addInline((0, raw_js_1.unescapeForRawComponent)(elem.children[0].data.trim()));
                }
            },
            ...formatters
        },
        selectors: [
            { format: 'skip', selector: 'img' },
            { format: 'skip', selector: '[data-skip="true"]' },
            { options: { linkBrackets: false }, selector: 'a' },
            {
                format: 'raw',
                options: {},
                selector: 'jsx-email-raw'
            },
            ...(selectors || [])
        ],
        ...options
    });
};
exports.renderPlainText = renderPlainText;
const render = async (component, options) => {
    let config = await (0, config_js_1.loadConfig)();
    if (config.render.plainText || options?.plainText)
        return (0, exports.renderPlainText)(component, typeof options?.plainText === 'object' ? options.plainText : {});
    const renderOptions = { render: options };
    if (options) {
        // Note: structuredClone chokes on symbols
        const { symbol: _, ...cloneTarget } = config;
        const merged = await (0, config_js_1.mergeConfig)(cloneTarget, renderOptions);
        config = await (0, config_js_1.defineConfig)(merged);
    }
    let html = await (0, jsx_to_string_js_1.jsxToString)(component);
    html = await (0, plugins_js_1.callHook)({ config, hookType: 'beforeRender', html });
    html = await processHtml(config, html);
    html = await (0, plugins_js_1.callHook)({ config, hookType: 'afterRender', html });
    return html;
};
exports.render = render;
const processHtml = async (config, html) => {
    const { rehype } = await import('rehype');
    const { default: stringify } = await import('rehype-stringify');
    const docType = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
    const movePlugin = await (0, move_style_js_1.getMovePlugin)();
    const settings = { emitParseErrors: true };
    const reJsxTags = new RegExp(`<[/]?(${exports.jsxEmailTags.join('|')})>`, 'g');
    // @ts-ignore: This is perfectly valid, see here: https://www.npmjs.com/package/rehype#examples
    const processor = rehype().data('settings', settings);
    processor.use(movePlugin);
    await (0, plugins_js_1.callProcessHook)({ config, processor });
    const doc = await processor
        .use(stringify, {
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        closeEmptyElements: true,
        collapseEmptyAttributes: true
    })
        .process(html);
    let result = docType + String(doc).replace('<!doctype html>', '').replace('<head></head>', '');
    result = result.replace(reJsxTags, '');
    result = result.replace(/<jsx-email-raw.*?><!--(.*?)--><\/jsx-email-raw>/g, (_, p1) => (0, raw_js_1.unescapeForRawComponent)(p1));
    return result;
};
//# sourceMappingURL=render.js.map