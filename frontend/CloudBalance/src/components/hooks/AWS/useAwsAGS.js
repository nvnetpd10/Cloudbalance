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
          "https://mocki.io/v1/94f135b4-8ba4-435d-bc81-0b75bcf74afc"
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
