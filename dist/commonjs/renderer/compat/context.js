"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readContext = exports.useContext = exports.createContext = void 0;
function InternalProvider(ctx) {
    const provider = ({ children, value }) => {
        ctx.push(value);
        return children;
    };
    provider.$$typeof = Symbol.for('react.provider');
    provider.context = ctx;
    return provider;
}
const InternalConsumer = (ctx) => {
    const consumer = ({ children }) => children(ctx[ctx.length - 1]);
    consumer.$$typeof = Symbol.for('react.consumer');
    return consumer;
};
const createContext = (defaultValue) => {
    const value = [defaultValue];
    const context = {
        Consumer: InternalConsumer(value),
        internalValue: value,
        Provider: InternalProvider(value)
    };
    return context;
};
exports.createContext = createContext;
const useContext = (context) => {
    const ctx = context.internalValue;
    return ctx[ctx.length - 1];
};
exports.useContext = useContext;
const readContext = (context) => context.internalValue;
exports.readContext = readContext;
//# sourceMappingURL=context.js.map