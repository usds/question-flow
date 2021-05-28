/*
  eslint-disable no-console,
                 @typescript-eslint/no-explicit-any,
                 @typescript-eslint/explicit-module-boundary-types,
*/

/**
 * Logs to the console. All arguments logged as an array.
 * @param params
 * @returns
 */
export const log = (...params: any) => console.log([...params]);
