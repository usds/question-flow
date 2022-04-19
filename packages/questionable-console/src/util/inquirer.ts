/* eslint-disable global-require, @typescript-eslint/no-var-requires */
import { error }          from '@usds.gov/questionable-core';
import { registerPrompt } from 'inquirer';
// import idp                from 'inquirer-date-prompt';

try {
  // registerPrompt('date', idp as any);
} catch (e) {
  error(e);
}
try {
  registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
} catch (e) {
  error(e);
}
