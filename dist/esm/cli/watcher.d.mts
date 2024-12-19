import { type ViteDevServer } from 'vite';
import { type BuildTempatesResult } from './commands/build.mjs';
import { type PreviewCommonParams } from './commands/types.mjs';
interface WatchArgs {
    common: PreviewCommonParams;
    files: BuildTempatesResult[];
    server: ViteDevServer;
}
export declare const watch: (args: WatchArgs) => Promise<void>;
export {};
//# sourceMappingURL=watcher.d.mts.map