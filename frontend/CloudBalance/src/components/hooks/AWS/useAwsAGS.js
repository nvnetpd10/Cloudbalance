import { useState, useEffect } from "react";
import axios from "axios";

export default function useAwsAGS() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const res = await axios.get(
          "https://mocki.io/v1/0407862a-f5da-4ede-82ca-1d995a1e123a"
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
