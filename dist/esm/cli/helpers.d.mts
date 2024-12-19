import { type BuildTempatesResult } from './commands/build.mjs';
export { originalCwd } from '../helpers.js';
interface BuildForPreviewParams {
    buildPath: string;
    exclude?: string;
    quiet?: boolean;
    targetPath: string;
}
export declare const gmailByteLimit = 102000;
export declare const gmailBytesSafe: number;
export declare const buildForPreview: ({ buildPath, exclude, quiet, targetPath }: BuildForPreviewParams) => Promise<BuildTempatesResult[]>;
export declare const formatBytes: (bytes: number) => string;
export declare const writePreviewDataFiles: (files: BuildTempatesResult[]) => Promise<void>;
//# sourceMappingURL=helpers.d.mts.map