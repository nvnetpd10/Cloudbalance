import { useMemo } from "react";
import dayjs from "dayjs";

export default function useCostSeries(rawData) {
  return useMemo(() => {
    if (!rawData || rawData.length === 0)
      return { processedSeries: [], uniqueDates: [] };

    const dates = [
      ...new Set(
        rawData.map((item) => dayjs(item.billDate).format("YYYY-MM-DD"))
      ),
    ].sort();
    const groups = [...new Set(rawData.map((item) => item.groupKey))];

    const seriesData = groups.map((groupName) => {
      const dataPoints = dates.map((dateStr) => {
        const record = rawData.find((item) => {
          const itemDate = dayjs(item.billDate).format("YYYY-MM-DD");
          return item.groupKey === groupName && itemDate === dateStr;
        });
        return record ? record.totalCost : 0;
      });

      return { name: groupName, data: dataPoints };
    });

    return {
      processedSeries: seriesData,
      uniqueDates: dates.map((d) => dayjs(d).format("DD MMM")),
    };
  }, [rawData]);
}
