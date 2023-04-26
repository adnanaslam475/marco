import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ApiFunc = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          signal: controllerRef.current.signal,
          url,
        });
        setData(response.data);
      } catch (error) {
        setError(error.message || "Errore");
      } finally {
        setLoading(true);
      }
    })();
  }, [url]);

  return { cancel, data, error, loading };
};

export default ApiFunc;
