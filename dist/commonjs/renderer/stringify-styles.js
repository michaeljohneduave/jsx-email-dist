"use strict";
/**
 * Note: Parts of this file are derived from [Hyperons](https://github.com/i-like-robots/hyperons).
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyStyles = void 0;
const escape_string_js_1 = require("./escape-string.js");
const UPPERCASE = /([A-Z])/g;
const MS = /^ms-/;
const UNITLESS_PROPS = new Set([
    'animationIterationCount',
    'columns',
    'columnCount',
    'flex',
    'flexGrow',
    'flexShrink',
    'fontWeight',
    'gridColumn',
    'gridColumnEnd',
    'gridColumnStart',
    'gridRow',
    'gridRowEnd',
    'gridRowStart',
    'lineHeight',
    'opacity',
    'order',
    'orphans',
    'tabSize',
    'widows',
    'zIndex',
    'zoom'
]);
const CACHE = {};
function hyphenateChar(char) {
    return `-${char.toLowerCase()}`;
}
function hyphenateString(prop) {
    return prop.replace(UPPERCASE, hyphenateChar).replace(MS, '-ms-');
}
/**
 * Converts a React style object to a string.
 * This is based on Hyperon's
 * [`stringifyStyles`](https://github.com/i-like-robots/hyperons/blob/main/src/stringify-styles.js).
 * @param styles The styles to stringify.
 * @returns A string representation of the styles, suitable for use in a `style` attribute.
 */
function stringifyStyles(styles) {
    const parts = [];
    for (const key of Object.keys(styles)) {
        const value = styles[key];
        if (value != null) {
            const unit = typeof value === 'number' && value !== 0 && !UNITLESS_PROPS.has(key) ? 'px' : '';
            const normalized = CACHE[key] || (CACHE[key] = hyphenateString(key));
            parts.push(`${normalized}:${typeof value === 'number' ? value : (0, escape_string_js_1.escapeString)(value)}${unit}`);
        }
    }
    return parts.join(';');
}
exports.stringifyStyles = stringifyStyles;
//# sourceMappingURL=stringify-styles.js.map