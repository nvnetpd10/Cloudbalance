import { useState, useEffect } from "react";
import axios from "axios";

export default function useAwsRDS() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const res = await axios.get(
          "https://mocki.io/v1/0b39d1ad-60b2-4c97-806f-c76c5949c267"
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
