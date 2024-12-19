"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsxToString = void 0;
/**
 * Note: Parts of this file are derived from [Hyperons](https://github.com/i-like-robots/hyperons).
 * @license MIT
 */
const chalk_1 = __importDefault(require("chalk"));
const log_js_1 = require("../log.js");
const constants_js_1 = require("./constants.js");
const escape_string_js_1 = require("./escape-string.js");
const stringify_styles_js_1 = require("./stringify-styles.js");
const renderSuspense = async (children) => {
    try {
        const result = await jsxToString(children);
        return result;
    }
    catch (error) {
        if (error instanceof Promise) {
            await error;
            return renderSuspense(children);
        }
        throw error;
    }
};
/**
 * Convert a JSX element to a string.
 * This is a slightly modified version of Hyperons's
 * [`renderToString`](https://github.com/i-like-robots/hyperons/blob/main/src/render-to-string.js) function.
 *
 * @param element The JSX element to convert to a string
 * @returns The string representation of the JSX element
 */
async function jsxToString(element) {
    if (element == null) {
        return '';
    }
    if (typeof element === 'string') {
        return (0, escape_string_js_1.escapeString)(element);
    }
    else if (typeof element === 'number') {
        return String(element);
    }
    else if (typeof element === 'boolean' || element == null) {
        return '';
    }
    else if (isIterable(element)) {
        let html = '';
        for (const child of element) {
            // eslint-disable-next-line no-await-in-loop
            html += await jsxToString(child);
        }
        return html;
    }
    if (typeof element.$$typeof !== 'symbol') {
        log_js_1.log.error((0, chalk_1.default) `{red Unsupported JSX element}:`, element);
        throw new Error(`Unsupported JSX element`);
    }
    const { type } = element;
    const props = element.props || constants_js_1.EmptyObject;
    if (typeof type === 'string') {
        let html = `<${type}`;
        let innerHTML = '';
        for (const prop of Object.keys(props)) {
            const value = props[prop];
            if (prop === 'children' || prop === 'key' || prop === 'ref' || value == null) {
                // Why not use a continue statement? It's slower ¯\_(ツ)_/¯
            }
            else if (prop === 'class' || prop === 'className') {
                // This condition is here because it is the most common attribute
                // and short-circuiting results in a ~5% performance boost.
                html += value ? ` class="${(0, escape_string_js_1.escapeString)(value)}"` : '';
            }
            else if (prop === 'style') {
                html += ` style="${(0, stringify_styles_js_1.stringifyStyles)(value)}"`;
            }
            else if (prop === 'dangerouslySetInnerHTML') {
                // eslint-disable-next-line no-underscore-dangle
                innerHTML = value.__html;
            }
            else {
                const name = constants_js_1.AttributeAliases[prop] || prop;
                if (constants_js_1.BooleanAttributes.has(name)) {
                    html += value ? ` ${name}` : '';
                }
                else if (typeof value === 'string') {
                    html += ` ${name}="${(0, escape_string_js_1.escapeString)(value)}"`;
                }
                else if (typeof value === 'number') {
                    html += ` ${name}="${String(value)}"`;
                }
                else if (typeof value === 'boolean') {
                    html += ` ${name}="${value}"`;
                }
            }
        }
        if (constants_js_1.VoidElements.has(type)) {
            html += '/>';
        }
        else {
            html += '>';
            if (innerHTML) {
                html += innerHTML;
            }
            else {
                html += await jsxToString(props.children);
            }
            html += `</${type}>`;
        }
        return html;
    }
    else if (type) {
        if (typeof type === 'function') {
            const renderedFC = await jsxToString(type(props));
            const sym = type.$$typeof;
            if (sym && Symbol.keyFor(sym) === 'react.provider') {
                type.context.pop();
            }
            return renderedFC;
        }
        else if (typeof type === 'symbol') {
            const key = Symbol.keyFor(type);
            // is this react fragment?
            if (key === 'react.fragment') {
                return jsxToString(props.children);
            }
            else if (key === 'react.suspense') {
                const suspenseResult = await renderSuspense(props.children);
                return suspenseResult;
            }
        }
        else if (isReactForwardRef(type)) {
            return jsxToString(type.render(props, props.ref));
        }
        else if (type.$$typeof) {
            const key = Symbol.keyFor(type.$$typeof);
            if (key === 'react.provider') {
                type.context.pop();
            }
            else if (key === 'react.context') {
                return jsxToString(props.children);
            }
        }
        log_js_1.log.error((0, chalk_1.default) `{red Unsupported JSX element}:`, type);
        throw new Error(`Unsupported JSX element type ${JSON.stringify(type)}`);
    }
    return '';
}
exports.jsxToString = jsxToString;
function isIterable(node) {
    return typeof node === 'object' && node !== null && Symbol.iterator in node;
}
function isReactForwardRef(type) {
    return (typeof type === 'object' &&
        type !== null &&
        'render' in type &&
        '$$typeof' in type &&
        typeof type.$$typeof === 'symbol' &&
        Symbol.keyFor(type.$$typeof) === 'react.forward_ref');
}
//# sourceMappingURL=jsx-to-string.js.map