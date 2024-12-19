"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useData = void 0;
// Note: tshy has some bugs with dual-mode package importing in the cjs build https://github.com/isaacs/tshy/issues/50
// @ts-ignore
const hash_it_1 = __importDefault(require("hash-it"));
const promiseMap = new Map();
const wrapPromise = (promise) => {
    let status = 'pending';
    let result;
    const suspender = promise.then((r) => {
        status = 'success';
        result = r;
    }, (e) => {
        status = 'error';
        result = e;
    });
    return {
        // eslint-disable-next-line consistent-return
        read() {
            if (status === 'pending') {
                throw suspender;
            }
            else if (status === 'error') {
                throw result;
            }
            else if (status === 'success') {
                return result;
            }
        }
    };
};
const useData = (props, cb) => {
    const key = (0, hash_it_1.default)(props);
    let dataPromise;
    if (promiseMap.has(key)) {
        dataPromise = promiseMap.get(key);
    }
    else {
        dataPromise = wrapPromise(cb());
        promiseMap.set(key, dataPromise);
    }
    return dataPromise.read();
};
exports.useData = useData;
//# sourceMappingURL=suspense.js.map