"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useEffect = exports.useCallback = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log_js_1 = require("../../log.js");
const noop = () => { };
const logWarning = (hook) => log_js_1.log.warn((0, chalk_1.default) `${hook} is present for React compatibility but is not fully supported. Email is not reactive.`);
const useCallback = (fn) => {
    logWarning('useCallback');
    return fn;
};
exports.useCallback = useCallback;
const useEffect = () => {
    logWarning('useEffect');
};
exports.useEffect = useEffect;
const useLayoutEffect = () => {
    logWarning('useLayoutEffect');
};
exports.useLayoutEffect = useLayoutEffect;
function useMemo(fn) {
    logWarning('useMemo');
    return fn();
}
exports.useMemo = useMemo;
function useReducer(_, value, init) {
    logWarning('useReducer');
    let result = value;
    if (typeof init === 'function')
        result = init(value);
    return [result, noop];
}
exports.useReducer = useReducer;
const useRef = (value) => {
    logWarning('useRef');
    return { current: value };
};
exports.useRef = useRef;
const useState = (value) => [value, noop];
exports.useState = useState;
//# sourceMappingURL=hooks.js.map