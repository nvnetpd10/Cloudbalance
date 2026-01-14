import { useEffect, useState } from "react";

export default function useCostExplorerData({ startDate, endDate, tab, columns }) {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      const requestPayload = {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        groupByColumn: columns[tab],
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/snowflake/getCostReportGrouped",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestPayload),
          }
        );

        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        const data = await response.json();
        setRawData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [startDate, endDate, tab, columns]);

  return { rawData, loading };
}
