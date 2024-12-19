import { boolean, number, object, optional, string, union } from 'valibot';
export const PreviewCommandOptionsStruct = object({
    basePath: optional(string()),
    buildPath: optional(string()),
    exclude: optional(string()),
    host: optional(boolean()),
    open: optional(boolean()),
    port: optional(union([number(), string()]))
});
//# sourceMappingURL=types.mjs.map