import { error }    from '@usds.gov/questionable-core';
import { TTypeVal } from './types';

// eslint-disable-next-line no-promise-executor-return
export const sleep = (delay: 1000) => new Promise((f) => setTimeout(f, delay));

function isString(val: unknown) {
  return (val instanceof String || typeof val === 'string');
}

export function getAnswer(a?: TTypeVal): string {
  if (!a) {
    return '';
  }
  if (Array.isArray(a)) {
    return a.join(',');
  }
  if (Array.isArray(a.answer)) {
    return a.answer.join(',');
  }
  if (isString(a)) {
    return `${a}`;
  }
  if (isString(a.answer)) {
    return `${a.answer}`;
  }
  if (isString(a.value)) {
    return `${a.value}`;
  }
  if (isString(a.short)) {
    return `${a.short}`;
  }
  const str = JSON.stringify(a);
  error(`Could not determine value of answer ${str}`);
  return str;
}
