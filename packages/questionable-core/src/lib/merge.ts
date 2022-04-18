/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isArray,
  isEmpty,
  isFunction,
  isNumber,
  isString,
  mergeWith,
  noop,
} from 'lodash';

// eslint-disable-next-line consistent-return
function customizer(objValue: any, srcValue: any): any | void {
  if (isArray(objValue) && isArray(srcValue)) {
    return objValue.concat(srcValue);
  }
  if (isEmpty(objValue)) {
    return srcValue;
  }
  if (isEmpty(srcValue)) {
    return objValue;
  }
  if (isFunction(objValue)
    && (srcValue === noop
      || isEmpty(srcValue)
      || srcValue === null
      || srcValue === undefined)) {
    return objValue;
  }
  if (isFunction(srcValue)
    && (objValue === noop
      || isEmpty(objValue)
      || objValue === null
      || objValue === undefined)) {
    return srcValue;
  }
  if (isString(objValue) || isString(srcValue)) {
    if (isEmpty(srcValue)
      || srcValue === null
      || srcValue === undefined
      || !srcValue) {
      return objValue;
    }
    if (isEmpty(objValue)
      || objValue === null
      || objValue === undefined
      || !objValue) {
      return srcValue;
    }
    return srcValue || objValue;
  }
  if (isNumber(objValue) || isNumber(srcValue)) {
    if (isEmpty(srcValue)
      || srcValue === null
      || srcValue === undefined
      || srcValue + ''.length === 0) {
      return objValue;
    }
    if (isEmpty(objValue)
      || objValue === null
      || objValue === undefined
      || objValue + ''.length === 0) {
      return srcValue;
    }
    return srcValue || objValue;
  }
}

export function merge({ params = [] }: { params?: any[]; } = {}) {
  return mergeWith([...params], customizer);
}
