import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.baseURL = process.env['API_URI'];

export default function useFetch<T>(
  method: string,
  url: string,
  data?: any,
  headers?: string
) {
  const [resData, setResData] = useState<T>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .request({ method, url, data })
      .then((res) => setResData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
}
