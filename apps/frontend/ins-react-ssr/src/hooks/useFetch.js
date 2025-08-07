import { useEffect, useState } from 'react';

const useFetch = (apiCall) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      //setLoading(true);
      const response = await apiCall();
      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiCall]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;