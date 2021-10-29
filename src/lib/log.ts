/* eslint-disable @typescript-eslint/no-explicit-any */
import { serializeError } from 'serialize-error';

const { log: logInfo, error: logError } = console;

export abstract class Logger {
  /**
   * Logs to the console. All arguments logged as an object.
   * @param params
   * @returns
   */
  public static log(message: string, ...params: any) {
    logInfo(message, ...params);
  }

  public static error(message: any, e: Error, ...params: any) {
    logError(
      {
        error: serializeError(e),
        ...params,
      },
      message,
    );
  }
}

export const { log, error } = Logger;
