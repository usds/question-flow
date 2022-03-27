import { log } from '@usds.gov/questionable-core';

/**
 * Generic no-element
 * @returns empty element
 */
export const noel = (message = '', context = ''): JSX.Element => {
  if (message || context) {
    log('Created an empty element', message, context);
  }
  return (<>{message}</>);
};
