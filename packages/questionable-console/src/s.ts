/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Command }     from 'commander';
import shell           from 'shelljs';
import { Scaffolding } from './examples/Scaffolding';
import { blue }        from './util/logger';

const program = new Command();

program
  .name('va.gov-onboarding')
  .description('CLI to onboard')
  .version('0.1.0');

program.command('version')
  .description('Gets the version')
  .action(() => {
    blue(`${shell.cat('package.json').grep('version')}`);
  });

program
  .command('init')
  .description('Start the scaffolding wizard')
  .action(async () => {
    const run = new Scaffolding();
    run.iterable.start();
  });

program.parse();
