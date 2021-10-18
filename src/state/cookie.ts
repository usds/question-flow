import * as Cookies from 'js-cookie';

interface IPersists {
    age: number;
    results: IResult[];
}

interface IResult {
    category?: string;
    description: string;
    name?: string;
}

const parse = (val: string | undefined): IPersists => {
  if (!val) return { age: 0, results: [] } as IPersists;
  const ret = JSON.parse(val);
  return ret as IPersists;
};

const get = (cookieName: string) => parse(Cookies.get(cookieName));

const set = (cookieName: string, cook: IPersists) => Cookies.set(cookieName, JSON.stringify(cook));

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
