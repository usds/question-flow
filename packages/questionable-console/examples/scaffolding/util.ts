#! ../../../../node_modules/.bin/ts-node

import {
  $, argv, cd, chalk, fs, question,
} from 'zx';
import path from 'path';
import which from 'which';

(async function foo() {
  await $`ls`;
}());

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

/**
 * Check for programs required by this script.
 */

async function checkRequiredProgramsExist(programs) {
  try {
    for (const program of programs) {
      await which(program);
    }
  } catch (error) {
    exitWithError(`Error: Required command ${error.message}`);
  }
}

await checkRequiredProgramsExist(['git', 'node', 'npx']);

export const getDirectories = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const repos = getDirectories(`${__dirname}/../`);


// let initPath = await question('Is this your first time configuring this environment to run VA.gov? ', {
//   choices: ['y', 'n']
// })
// if (initPath === 'y') {
//   console.log(chalk.blue('Welcome aboard. We\'ll have you up and running in no time. The first step is to choose where your working directory is located. You can select either the current directory or you can specify your own path (note: this can be changed later, but it may be very time consuming)'));
//   console.log();
//   const getPath = (current = __dirname) => {
//     let path = await question(`${chalk.white('Please pick a path:')} ${chalk.gray('d/C')} \r\n${chalk.yellow('-d Current/default: ' + current)}\r\n${chalk.yellow('-d Custom')}`, {
//       choices: [
//         'Current (default): -c',
//         'This path: -p /...'
//       ]
//     });
//     let pathCconfirm = question(chalk.white(`You selected ${path}. Is this correct? ${chalk.gray('y/N')}`));
//     if (pathCconfirm !== 'y') {
//       return getPath(path);
//     }
//     return path;
//   }
//   console.log(`Working directory has been set to ${path}`);
//   console.log();
//   console.log(chalk.blue('The next step is to pull down the source code for the projects you will need to work on. You can have everything, just the frontend, just the backed or decide for each repo.'));
//   let repoSelection = await question('What codebases (repositories) will you need to work with?', {
//     choices: [
//       chalk.yellow('All: -a --all \\n'),
//       chalk.yellow('Frontend-only: -f --frontend \\n'),
//       chalk.yellow('Backend-only: -b --backend'),
//       chalk.yellow('Let me choose: -c --choose'),
//       chalk.yellow('None for now: -n --none'),
//     ],
//   })
//   let confirmRepo = await question(`You selected `)
//   switch (repoSelection) {
//     case 'a':
//       for (const repo of repos) {
//         const pkg = require(__dirname + '/../' + repo + '/package.json');

//       }
//       break;
//     case 'n':

//       break;
//   }
// } else {
//   console.log(chalk.blue('Welcome back. Since you have already configured your environment, from here you can do a couple of things: reset all to factory defaults, add or remove repos, or run troubleshooting?'));
// }
