import axios, { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFetch = Promise<AxiosResponse<any, any>>;

export async function fetchData(url: string): TFetch {
  return axios.get(url);
}
