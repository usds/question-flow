import { log }       from '@usds.gov/questionable';
import { kebabCase } from 'lodash';

const getKeyName = (keyName: string) => kebabCase(keyName.trim().toLowerCase());

const get = (keyName: string) => {
  let ret     = '';
  const cName = getKeyName(keyName);
  try {
    const val = localStorage.getItem(cName);
    ret       = val || '';
  } catch (e) {
    log('Get cookie', e, { cName });
  }
  return ret;
};

export const isDebug = (): boolean => {
  const debug = get('debug');
  return debug === 'true' || debug === '1';
};
