/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
import _log  from 'loglevel';

class Logger {
  static toggleOut(t?: 'on' | 'off' | true | false) {
    if (t === 'on' || t === true) {
      _log.enableAll(true);
    } else {
      _log.enableAll(false);
    }
  }

  static log(...msg: any[]) {
    return _log.log(...msg);
  }

  static info(...msg: any[]) {
    return _log.info(...msg);
  }

  static warn(...msg: any[]) {
    return _log.warn(...msg);
  }

  // TODO: add callstack and error serialization
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
  toggleOut,
  red,
} = Logger;
