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
export const createContext = (defaultValue) => {
    const value = [defaultValue];
    const context = {
        Consumer: InternalConsumer(value),
        internalValue: value,
        Provider: InternalProvider(value)
    };
    return context;
};
export const useContext = (context) => {
    const ctx = context.internalValue;
    return ctx[ctx.length - 1];
};
export const readContext = (context) => context.internalValue;
//# sourceMappingURL=context.js.map