import type { InferOutput as Infer } from 'valibot';
import type { CommandFn } from './types.mjs';
declare const BuildCommandOptionsStruct: import("valibot").ObjectSchema<{
    readonly exclude: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly html: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly inlineCss: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly minify: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly out: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly plain: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly pretty: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly props: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly silent: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly usePreviewProps: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
    readonly writeToFile: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, never>;
}, undefined>;
type BuildCommandOptions = Infer<typeof BuildCommandOptionsStruct>;
interface BuildCommandOptionsInternal extends BuildCommandOptions {
    showStats?: boolean;
}
interface BuildTemplateParams {
    buildOptions: BuildCommandOptionsInternal;
    targetPath: string;
}
interface BuildOptions {
    argv: BuildCommandOptions;
    outputBasePath?: string;
    path: string;
    sourceFile: string;
}
export interface BuildResult {
    compiledPath: string;
    html: string | null;
    metaPath?: string;
    plainText: string | null;
    sourceFile: string;
    templateName: string | null;
    writePathBase: string;
}
export interface BuildTempatesResult extends BuildResult {
    fileName: string;
}
export declare const help: string;
export declare const normalizePath: (filename: string) => string;
export declare const getTempPath: (type: 'build' | 'preview') => Promise<string>;
export declare const build: (options: BuildOptions) => Promise<BuildResult>;
export declare const buildTemplates: ({ targetPath, buildOptions }: BuildTemplateParams) => Promise<BuildTempatesResult[]>;
export declare const command: CommandFn;
export {};
//# sourceMappingURL=build.d.mts.map