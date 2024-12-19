import yargs from 'yargs-parser';
import { name, version } from '../package-info.cjs';
import { debug } from '../debug.js';
import { command as build } from './commands/build.mjs';
import { command as check } from './commands/check.mjs';
import { command as create } from './commands/create.mjs';
import { command as help } from './commands/help.mjs';
import { command as preview } from './commands/preview.mjs';
import { loadConfig } from '../config.js';
const commands = { build, check, create, help, preview };
const { log } = console;
const run = async () => {
    const argv = yargs(process.argv.slice(2), { configuration: { 'strip-dashed': true } });
    const { _: positionals, ...flags } = argv;
    const [commandName] = positionals;
    let command = commands[commandName];
    globalThis.isJsxEmailPreview = false;
    debug.cli(`Command Name: \`${commandName}\``);
    if (flags.version) {
        log(`${name} v${version}\n`);
        return;
    }
    if (!command)
        command = help;
    await loadConfig();
    const input = positionals.slice(1) || [];
    const result = await command(flags, input);
    if (!result) {
        debug.cli(`Command \`${commandName}\` returned \`false\``);
        help({}, []);
    }
};
run();
//# sourceMappingURL=main.mjs.map