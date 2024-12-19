"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescapeForRawComponent = exports.escapeForRawComponent = void 0;
const START_TAG = '__COMMENT_START';
const END_TAG = '__COMMENT_END';
function escapeForRawComponent(input) {
    // escape comment sequences
    return input.replace(/<!--/g, START_TAG).replace(/-->/g, END_TAG);
}
exports.escapeForRawComponent = escapeForRawComponent;
function unescapeForRawComponent(input) {
    return input
        .replace(new RegExp(START_TAG, 'g'), '<!--')
        .replace(new RegExp(END_TAG, 'g'), '/-->');
}
exports.unescapeForRawComponent = unescapeForRawComponent;
//# sourceMappingURL=raw.js.map