"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const promises_1 = require("node:fs/promises");
const path_1 = require("path");
const esbuild_1 = __importDefault(require("esbuild"));
const config_js_1 = require("../config.js");
const log_js_1 = require("../log.js");
// Note: after server start we change the root directory to trick vite
const originalCwd = process.cwd();
const cssPlugin = {
    name: 'jsx-email/css-plugin',
    setup(builder) {
        builder.onLoad({ filter: /\.css$/ }, async (args) => {
            const buffer = await (0, promises_1.readFile)(args.path);
            const css = await esbuild_1.default.transform(buffer, { loader: 'css', minify: false });
            return { contents: css.code, loader: 'text' };
        });
    }
};
/**
 * @desc Compiles a JSX/TSX template file using esbuild
 * @param options CompileOptions
 * @returns Promise<CompileResult[]> An array of files affected by the compilation
 */
const compile = async (options) => {
    const config = await (0, config_js_1.loadConfig)();
    const { files, hashFiles = true, outDir, writeMeta = false } = options;
    const { metafile } = await esbuild_1.default.build({
        bundle: true,
        define: {
            'import.meta.isJsxEmailPreview': JSON.stringify(globalThis.isJsxEmailPreview || false)
        },
        entryNames: hashFiles ? '[dir]/[name]-[hash]' : '[dir]/[name]',
        entryPoints: files,
        jsx: 'automatic',
        logLevel: 'error',
        metafile: true,
        outdir: outDir,
        platform: 'node',
        plugins: [cssPlugin],
        write: true,
        ...config.esbuild
    });
    const { outputs } = metafile;
    const outputPaths = Object.keys(outputs);
    const affectedFiles = outputPaths
        .map((path) => {
        const { entryPoint } = metafile.outputs[path];
        if (!entryPoint)
            return null;
        return {
            entryPoint,
            path: (0, path_1.resolve)('/', path)
        };
    })
        .filter(Boolean);
    // log.debug({ affectedFiles });
    if (metafile && writeMeta) {
        const ops = Object.entries(outputs).map(async ([path]) => {
            const fileName = (0, path_1.basename)(path, (0, path_1.extname)(path));
            const metaPath = (0, path_1.join)((0, path_1.dirname)(path), `${fileName}.meta.json`);
            const writePath = (0, path_1.resolve)(originalCwd, metaPath);
            const json = JSON.stringify(metafile);
            log_js_1.log.debug('meta writePath:', writePath);
            await (0, promises_1.writeFile)(writePath, json, 'utf8');
        });
        await Promise.all(ops);
    }
    return affectedFiles;
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map