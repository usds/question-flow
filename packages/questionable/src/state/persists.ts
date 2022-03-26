import { kebabCase }                from 'lodash';
import { catchError, error as log } from '@usds.gov/questionable-core';

interface IPersists {
  age: number;
  branch?: string;
  results: IResult[];
}

interface IResult {
  category?: string;
  description: string;
  name?: string;
}

const parse = (val: string | undefined | null): IPersists => {
  if (!val) return { age: 0, results: [] } as IPersists;
  const ret = JSON.parse(val);
  return ret as IPersists;
};

const getCookieName = (cookieName: string) => kebabCase(cookieName.trim().toLowerCase());

const get = (cookieName: string) => {
  let ret     = { age: 0, results: [] } as IPersists;
  const cName = getCookieName(cookieName);
  try {
    const cookieVal = document.cookie
      .split('; ')
      ?.find((row: string) => row.startsWith(`${cName}=`))
      ?.split('=')[1];
    ret             = parse(cookieVal);
  } catch (e) {
    const error = catchError(e);
    log('Get cookie', error, { cName });
  }
  return ret;
};

const set = (cookieName: string, cook: IPersists) => {
  const cName = getCookieName(cookieName);
  try {
    document.cookie = `${cName}=${JSON.stringify(cook)}; path=/;`;
  } catch (e) {
    const error = catchError(e);
    log('Set cookie', error, { cName, cook });
  }
};

export const setAge = (cookieName: string, age: number): void => {
  const cook = get(cookieName);
  cook.age   = age;
  set(cookieName, cook);
};

export const setBranch = (cookieName: string, branch: string): void => {
  const cook  = get(cookieName);
  cook.branch = branch;
  set(cookieName, cook);
};

export const setResult = (cookieName: string, result: IResult): void => {
  const cook   = get(cookieName);
  cook.results = cook.results || [];
  cook.results.push(result);
  set(cookieName, cook);
};

export const setResults = (cookieName: string, results: IResult[]): void => {
  const cook   = get(cookieName);
  cook.results = results;
  set(cookieName, cook);
};
