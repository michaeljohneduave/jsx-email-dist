import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { globby } from 'globby';
import mime from 'mime-types';
// Note: another tshy problem https://github.com/isaacs/tshy/issues/96
// @ts-ignore
import { normalizePath } from 'vite';
const mimeTypes = {
    '.7z': 'application/x-7z-compressed',
    '.css': 'text/css',
    '.eot': 'font/eot',
    '.gif': 'image/gif',
    '.gz': 'application/gzip',
    '.html': 'text/html',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.mjs': 'text/javascript',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.otf': 'font/otf',
    '.png': 'image/png',
    '.rar': 'application/x-rar-compressed',
    '.svg': 'image/svg+xml',
    '.tiff': 'image/tiff',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain',
    '.wasm': 'application/wasm',
    '.webm': 'video/webm',
    '.webp': 'image/webp',
    '.wgsl': 'text/wgsl',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xml': 'text/xml',
    '.zip': 'application/zip'
};
const getContentType = (file) => mime.lookup(file);
const middleware = async (params) => {
    const { options, server } = params;
    const { paths } = options;
    const files = await globby(paths.map(p => normalizePath(p)));
    return () => {
        // Note: another tshy problem https://github.com/isaacs/tshy/issues/96
        // @ts-ignore
        server.middlewares.use(async (req, res, next) => {
            const base = req.originalUrl ?? '';
            const pathName = new URL(base, `http://${req.headers.host}`).pathname.slice(1);
            if (!pathName) {
                next();
                return;
            }
            const filePath = files.find((path) => path.endsWith(pathName) || path.endsWith(decodeURIComponent(pathName)));
            if (filePath) {
                const extension = extname(filePath);
                const contentType = mimeTypes[extension] ||
                    getContentType(filePath) ||
                    mimeTypes['.html'] ||
                    getContentType('.html');
                res.setHeader('Content-Type', contentType);
                res.write(await readFile(filePath));
                res.end();
            }
            else {
                next();
            }
        });
    };
};
export const staticPlugin = (options) => {
    return {
        async configureServer(server) {
            const result = await middleware({ options, server });
            return result;
        },
        // Note: another tshy problem https://github.com/isaacs/tshy/issues/96
        // @ts-ignore
        name: 'jsx-email-static'
    };
};
//# sourceMappingURL=vite-static.mjs.map