"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfig = exports.setConfig = exports.loadConfig = exports.defineConfig = exports.current = exports.globalConfigSymbol = exports.defaults = void 0;
const assert_1 = require("assert");
const chalk_1 = __importDefault(require("chalk"));
const lilconfig_1 = require("lilconfig");
const log_js_1 = require("./log.js");
// @ts-ignore
const plugins_js_1 = require("./plugins.js");
const configSymbol = Symbol.for('jsx-email/config');
exports.defaults = {
    logLevel: 'info',
    plugins: [],
    render: {
        disableDefaultStyle: false,
        inlineCss: false,
        minify: false,
        plainText: false,
        pretty: false
    }
};
exports.globalConfigSymbol = Symbol.for('jsx-email/global/config');
const current = () => {
    let curr = globalThis[exports.globalConfigSymbol];
    // eslint-disable-next-line no-multi-assign
    if (!curr)
        curr = globalThis[exports.globalConfigSymbol] = { ...exports.defaults };
    return curr;
};
exports.current = current;
const plugins = {
    inline: '@jsx-email/plugin-inline',
    minify: '@jsx-email/plugin-minify',
    pretty: '@jsx-email/plugin-pretty'
};
const checkSymbol = (plugin, source) => {
    if (!plugin)
        return;
    const oops = `did not have the required 'symbol' property set correctly, and it can't be verified as a valid plugin`;
    const message = source
        ? (0, chalk_1.default) `{red jsx-email}: A plugin imported from '${source}' ${oops}`
        : (0, chalk_1.default) `{red jsx-email}: The plugin named '${plugin.name}' ${oops}`;
    if (plugin.symbol !== plugins_js_1.pluginSymbol) {
        log_js_1.log.error(message);
        throw new assert_1.AssertionError({ message });
    }
};
const checkName = (plugin, source) => {
    if (!plugin)
        return;
    const oops = `did not have the required 'name' property`;
    const message = source
        ? (0, chalk_1.default) `{red jsx-email}: A plugin imported from '${source}' ${oops}`
        : (0, chalk_1.default) `{red jsx-email}: A plugin added to the config ${oops}`;
    if (!plugin.name) {
        log_js_1.log.error(message);
        process.exit(1);
    }
};
const handleImportError = (error, name) => {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
        log_js_1.log.error((0, chalk_1.default) `{red jsx-email}: Tried to import plugin '${name}' but it wasn't found`);
    }
    else {
        log_js_1.log.error(error);
    }
};
// Note: We have to be verbose here so that bundlers pick up on the imports.
// Most of them can't handle dynamically importing these plugins from variables containing
// their names without additional config, and we don't want that burden on users
const importInlinePlugin = async () => {
    try {
        // Note: tshy up to bullshit again with compile errors where there are none
        // @ts-ignore
        const { plugin } = (await import('@jsx-email/plugin-inline'));
        return plugin;
    }
    catch (error) {
        handleImportError(error, '@jsx-email/plugin-inline');
    }
    return null;
};
const importMinifyPlugin = async () => {
    try {
        // @ts-ignore
        const { plugin } = (await import('@jsx-email/plugin-minify'));
        return plugin;
    }
    catch (error) {
        handleImportError(error, '@jsx-email/plugin-minify');
    }
    return null;
};
const importPrettyPlugin = async () => {
    try {
        // @ts-ignore
        const { plugin } = (await import('@jsx-email/plugin-pretty'));
        return plugin;
    }
    catch (error) {
        handleImportError(error, '@jsx-email/plugin-pretty');
    }
    return null;
};
const defineConfig = async (config = {}) => {
    if (typeof config === 'function') {
        const intermediate = await config();
        return (0, exports.defineConfig)(intermediate);
    }
    const mods = structuredClone(exports.defaults);
    if (!config.render?.plainText) {
        // Note: The order of plugins here actually matters for how the doc gets
        // transformed. Changing this ordering may produce undesirable html
        if (config.render?.inlineCss) {
            const inline = await importInlinePlugin();
            if (inline)
                mods.plugins.push(inline);
        }
        if (config.render?.minify) {
            const minify = await importMinifyPlugin();
            if (minify)
                mods.plugins.push(minify);
        }
        if (config.render?.pretty) {
            const pretty = await importPrettyPlugin();
            if (pretty)
                mods.plugins.push(pretty);
        }
        if (config.render?.minify && config.render.pretty) {
            log_js_1.log.warn((0, chalk_1.default) `{yellow jsx-email}: Both minify and pretty options are true. Please choose only one.`);
        }
        if ((config.render?.minify || config.render?.pretty) && config.render?.plainText) {
            log_js_1.log.warn((0, chalk_1.default) `{yellow jsx-email}: plaintText has been enabled, minify and pretty will have no effect.`);
            mods.plugins = mods.plugins.filter(({ name }) => name !== plugins.minify && name !== plugins.pretty);
        }
    }
    const result = await (0, exports.mergeConfig)(mods, config);
    const pluginMap = new Map();
    // Note: make sure we don't have duplicate plugins
    for (const plugin of result.plugins || [])
        pluginMap.set(plugin.name, plugin);
    result.plugins = Array.from(pluginMap, ([, value]) => value);
    for (const plugin of result.plugins || []) {
        checkName(plugin);
        checkSymbol(plugin);
        plugin.log = (0, log_js_1.getPluginLog)(plugin.name);
    }
    result.symbol = configSymbol;
    return result;
};
exports.defineConfig = defineConfig;
const moduleImport = async (id) => {
    try {
        const mod = await import(id);
        return mod;
    }
    catch (e) {
        try {
            return require(id);
        }
        catch (error) {
            if (error.code === 'ERR_REQUIRE_ESM' ||
                (error instanceof SyntaxError &&
                    error.toString().includes('Cannot use import statement outside a module'))) {
                throw e;
            }
            throw error;
        }
    }
};
const loadConfig = async (startDir) => {
    if (globalThis[exports.globalConfigSymbol])
        return globalThis[exports.globalConfigSymbol];
    const name = 'jsx-email';
    const searchResult = await (0, lilconfig_1.lilconfig)(name, {
        loaders: {
            '.cjs': moduleImport,
            '.js': moduleImport,
            '.mjs': moduleImport
        },
        searchPlaces: [
            `.config/${name}rc.js`,
            `.config/${name}rc.cjs`,
            `.config/${name}rc.mjs`,
            `.config/${name}.config.js`,
            `.config/${name}.config.cjs`,
            `.config/${name}.config.mjs`,
            `.${name}rc.js`,
            `.${name}rc.cjs`,
            `.${name}rc.mjs`,
            `${name}.config.js`,
            `${name}.config.cjs`,
            `${name}.config.mjs`
        ]
    }).search(startDir);
    log_js_1.log.debug('loadConfig →', { cwd: process.cwd(), searchResult, startDir });
    const configExports = searchResult?.config ?? {};
    const intermediate = configExports.config instanceof Promise ? await configExports.config : configExports.config;
    const config = intermediate ?? { ...exports.defaults };
    if (config.symbol === configSymbol) {
        globalThis[exports.globalConfigSymbol] = config;
        return config;
    }
    const definedConfig = await (0, exports.defineConfig)(config);
    process.env.DOT_LOG_LEVEL = definedConfig.logLevel || 'info';
    (0, exports.setConfig)(definedConfig);
    return definedConfig;
};
exports.loadConfig = loadConfig;
const setConfig = (config) => (globalThis[exports.globalConfigSymbol] = config);
exports.setConfig = setConfig;
// Note: This helps avoid issues with `merge ` because it uses structuredClone and doesn't play nice
// with complex objects'
// Keeping this async in case we need it for the future
const mergeConfig = async (a, b) => {
    const aPlugins = a.plugins || [];
    const bPlugins = b.plugins || [];
    /* eslint-disable no-param-reassign */
    delete a.plugins;
    delete b.plugins;
    const result = {
        ...a,
        ...b,
        plugins: [...aPlugins, ...bPlugins],
        render: { ...a.render, ...b.render }
    };
    return result;
};
exports.mergeConfig = mergeConfig;
//# sourceMappingURL=config.js.map