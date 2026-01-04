import { useState, useEffect } from "react";
import axios from "axios";

export default function useAwsEC2() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const res = await axios.get(
          "https://mocki.io/v1/175fb956-5789-430b-bf40-0338bdbcdbbb"
        );

        setResources(res.data);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { resources, loading };
}
