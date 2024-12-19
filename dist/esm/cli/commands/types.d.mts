import type React from 'react';
import { type InferOutput as Infer } from 'valibot';
export type Flags = Record<string, string | boolean | undefined>;
export type CommandFn = (flags: Flags, inputs: string[]) => Promise<boolean>;
export declare const PreviewCommandOptionsStruct: import("valibot").ObjectSchema<{
    readonly basePath: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly buildPath: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly exclude: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly host: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly open: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly port: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").NumberSchema<undefined>, import("valibot").StringSchema<undefined>], undefined>, never>;
}, undefined>;
export type PreviewCommandOptions = Infer<typeof PreviewCommandOptionsStruct>;
export interface PreviewCommonParams {
    argv: PreviewCommandOptions;
    targetPath: string;
}
export type TemplateFn = (props: {}) => React.JSX.Element;
//# sourceMappingURL=types.d.mts.map