/* eslint-disable @typescript-eslint/no-empty-function */
import { log } from './log';

/**
 * Generic no-operation
 */
export const noop = (): void => { };

/**
 * Generic no-element
 * @returns empty element
 */
export const noel = (message = '', context = ''): JSX.Element => {
  log('Created an empty element', message, context);
  return (<>{message}</>);
};
