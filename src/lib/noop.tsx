/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Generic no-operation
 */
export const noop = (): void => { };

/**
 * Generic no-element
 * @returns empty element
 */
export const noel = (message = ''): JSX.Element => (<>{message}</>);
