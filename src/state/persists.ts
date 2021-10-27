import { log } from '../lib/log';

interface IPersists {
    age: number;
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

const get = (cookieName: string) => {
  let ret = { age: 0, results: [] } as IPersists;
  try {
    const cookieVal = document.cookie
      .split('; ')?.find((row: string) => row.startsWith(`${cookieName}=`))?.split('=')[1];
    ret             = parse(cookieVal);
  } catch (e) {
    log(e);
  }
  return ret;
};

const set = (cookieName: string, cook: IPersists) => {
  try {
    document.cookie = `${cookieName}=${JSON.stringify(cook)}; path=/;`;
  } catch (e) {
    log(e);
  }
};

export const setAge = (cookieName: string, age: number): void => {
  const cook = get(cookieName);
  cook.age   = age;
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
