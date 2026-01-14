export const buildEchartsOption = ({
  uniqueDates,
  processedSeries,
  chartType,
}) => {
  const series = processedSeries.map((s) => ({
    ...s,
    type: chartType === "line" ? "line" : "bar",
    stack: chartType === "stacked" ? "total" : null,
    smooth: true,
  }));

  return {
    tooltip: { trigger: "axis" },
    legend: { bottom: 0, type: "scroll" },
    grid: { left: "3%", right: "3%", bottom: "18%", containLabel: true },
    xAxis: { type: "category", data: uniqueDates },
    yAxis: { type: "value", name: "Cost ($)" },
    series,
  };
};
