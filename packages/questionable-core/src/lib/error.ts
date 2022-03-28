/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const catchError = (e: any): Error => {
  if (e instanceof Error) {
    return e;
  }
  if (typeof e === 'string' || e instanceof String) {
    return new Error(`${e}`);
  }
  if (typeof e === 'number' || e instanceof Number) {
    return new Error(`${e}`);
  }
  if (typeof e === 'boolean' || e instanceof Boolean) {
    return new Error(`${e}`);
  }
  throw new Error(`${e}`);
};
