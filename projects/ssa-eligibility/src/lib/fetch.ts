/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios                   from 'axios';
import { CMS }                 from './interfaces';

type TLoading = null | string | boolean;
type TData = CMS | null;

export const useFetch = (url: string) => {
  const init: TLoading        = null;
  const [data, setData]       = useState<TData>(init);
  const [loading, setLoading] = useState<TLoading>(init);
  const [error, setError]     = useState<TLoading>(init);

  useEffect(() => {
    setLoading('loading...');
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios.get(url, { cancelToken: source.token })
      .then((res: any) => {
        setLoading(false);
        res.data && setData(res.data);
      })
      .catch((err: any) => {
        setLoading(false);
        setError(`An error occurred. Awkward..${err?.description || err}`);
      });
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, error, loading };
};
