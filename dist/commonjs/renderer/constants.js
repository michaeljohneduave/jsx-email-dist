"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidElements = exports.EmptyObject = exports.BooleanAttributes = exports.AttributeAliases = void 0;
exports.AttributeAliases = {
    acceptCharset: 'acceptcharset',
    accessKey: 'accesskey',
    allowFullScreen: 'allowfullscreen',
    autoCapitalize: 'autocapitalize',
    autoComplete: 'autocomplete',
    autoCorrect: 'autocorrect',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    charSet: 'charset',
    className: 'class',
    colSpan: 'colspan',
    contentEditable: 'contenteditable',
    crossOrigin: 'crossorigin',
    dateTime: 'datetime',
    defaultChecked: 'checked',
    defaultSelected: 'selected',
    defaultValue: 'value',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    longDesc: 'longdesc',
    maxLength: 'maxlength',
    minLength: 'minlength',
    noModule: 'nomodule',
    noValidate: 'novalidate',
    readOnly: 'readonly',
    referrerPolicy: 'referrerpolicy',
    rowSpan: 'rowspan',
    spellCheck: 'spellcheck',
    tabIndex: 'tabindex',
    useMap: 'usemap'
};
// <https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes>
exports.BooleanAttributes = new Set([
    'async',
    'allowfullscreen',
    'allowpaymentrequest',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'multiple',
    'muted',
    'novalidate',
    'nowrap',
    'open',
    'readonly',
    'required',
    'reversed',
    'selected'
]);
exports.EmptyObject = Object.freeze({});
// https://www.w3.org/TR/html/syntax.html#void-elements
exports.VoidElements = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
]);
//# sourceMappingURL=constants.js.map