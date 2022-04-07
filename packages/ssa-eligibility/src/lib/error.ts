import { error, log } from '@usds.gov/questionable';

export const catchError = (e: unknown): Error => {
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
  if (typeof e === 'object' || e instanceof Object) {
    return { ...e } as Error;
  }
  return new Error(`${e}`);
};

export const handleErrors = (message = '', e: unknown = undefined) => {
  if (!message || !e) {
    log('Unknown error', { e, message });
    return;
  }
  const err = catchError(e);
  error(message, err);
};
