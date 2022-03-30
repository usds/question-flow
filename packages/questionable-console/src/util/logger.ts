/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
import _log  from 'loglevel';

_log.enableAll(true);

class Logger {
  static log(...msg: any[]) {
    return _log.log(...msg);
  }

  static info(...msg: any[]) {
    return _log.info(...msg);
  }

  static warn(...msg: any[]) {
    return _log.warn(...msg);
  }

  static error(...msg: any[]) {
    return _log.error(...msg);
  }

  static getBaseLogger() {
    return _log;
  }

  static white(...msg: any[]) {
    return Logger.log(chalk.white(...msg));
  }

  static yellow(...msg: any[]) {
    return Logger.log(chalk.yellow(...msg));
  }

  static blue(...msg: any[]) {
    return Logger.log(chalk.blue(...msg));
  }

  static red(...msg: any[]) {
    return Logger.log(chalk.red(...msg));
  }
}

export const {
  log,
  info,
  warn,
  error,
  getBaseLogger,
  white,
  yellow,
  blue,
  red,
} = Logger;
