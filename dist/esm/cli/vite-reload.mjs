import micromatch from 'micromatch';
import { normalizePath } from './commands/build.mjs';
export const reloadPlugin = (options) => {
    const globs = options.globs.map((path) => normalizePath(path));
    let timer;
    return {
        apply: 'serve',
        // Note: and yet another tshy problem
        // @ts-ignore
        config({ server }) {
            /* eslint-disable no-param-reassign */
            if (!server)
                server = {};
            if (!server.watch)
                server.watch = {};
            server.watch.disableGlobbing = false;
        },
        async configureServer(server) {
            server.watcher.add([...globs]);
            server.watcher.on('create', (file) => {
                if (micromatch.isMatch(file, globs)) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        server.ws.send({ type: 'full-reload' });
                    }, 500);
                }
            });
        },
        // Note: another tshy problem https://github.com/isaacs/tshy/issues/96
        // @ts-ignore
        name: 'jsx-email-reload'
    };
};
//# sourceMappingURL=vite-reload.mjs.map