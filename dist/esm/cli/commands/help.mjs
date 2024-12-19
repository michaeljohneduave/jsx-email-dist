import chalk from 'chalk';
import { name, version } from '../../package-info.cjs';
import { help as build } from './build.mjs';
import { help as check } from './check.mjs';
import { help as create } from './create.mjs';
import { help as preview } from './preview.mjs';
const { log } = console;
export const helpMessage = chalk `
{blue ${name}} v${version}

The jsx-email CLI. Build, Check, Create and View email templates

{underline Usage}
  $ email [...options]

{underline Commands}
  build       {dim <template file or dir path>}
  check       {dim <template file path>}
  create      {dim <template name>}
  help        [{dim <command>}]
  preview     {dim <templates dir path>}

{underline Options}
  --help      Displays this message
  --version   Displays the current jsx-email version

{underline Examples}
  $ email
  $ email --help
  $ email build ./src/emails
  $ email check ./src/emails/Batman.tsx
  $ email create invite
  $ email preview ./src/emails
`;
const commands = { build, check, create, preview };
export const command = async (_, inputs) => {
    if ((inputs || []).length < 1) {
        log(helpMessage);
        return true;
    }
    const [lecommand] = inputs;
    const commandHelp = commands[lecommand] || helpMessage;
    log(commandHelp);
    return true;
};
//# sourceMappingURL=help.mjs.map