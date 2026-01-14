import React, { useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { Box, Paper, Stack, Switch, Typography } from "@mui/material";

import FullScreenLoader from "../../components/common/FullScreenLoader";

import DateRangePopper from "./components/DateRangePopper";
import CostExplorerHeader from "./components/CostExplorerHeader";
import ControlsBar from "./components/ControlsBar";
import FilterDrawer from "./components/FilterDrawer";
import CostTable from "./components/CostTable";

import useCostExplorerData from "./components/useCostExplorerData";
import useCostSeries from "./components/useCostSeries";

import { GROUP_BY_TABS, GROUP_BY_COLUMNS } from "./components/constants";
import { buildEchartsOption } from "./components/echartsOption";
import { formatCurrency } from "./components/formatters";

const CostExplorer = () => {
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const [startDate, setStartDate] = useState(dayjs("2025-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2025-01-04"));

  const [interval, setInterval] = useState("monthly");
  const [chartType, setChartType] = useState("grouped");

  const [datePopperOpen, setDatePopperOpen] = useState(false);
  const rangeRef = useRef(null);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});

  const handleMoreClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMore = () => setAnchorEl(null);

  const { rawData, loading } = useCostExplorerData({
    startDate,
    endDate,
    tab,
    columns: GROUP_BY_COLUMNS,
  });

  const { processedSeries, uniqueDates } = useCostSeries(rawData);

  const option = useMemo(() => {
    return buildEchartsOption({
      uniqueDates,
      processedSeries,
      chartType,
    });
  }, [uniqueDates, processedSeries, chartType]);

  return (
    <>
      <DateRangePopper
        open={datePopperOpen}
        anchorEl={rangeRef.current}
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
        onClose={() => setDatePopperOpen(false)}
      />

      <CostExplorerHeader />

      <Box sx={{ position: "relative", minHeight: 600 }}>
        {loading && <FullScreenLoader />}

        <Paper sx={{ p: 2, position: "relative", overflow: "hidden" }}>
          <ControlsBar
            tab={tab}
            setTab={setTab}
            tabs={GROUP_BY_TABS}
            anchorEl={anchorEl}
            onMoreClick={handleMoreClick}
            onMoreClose={handleCloseMore}
            filterDrawerOpen={filterDrawerOpen}
            onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
            rangeRef={rangeRef}
            startDate={startDate}
            endDate={endDate}
            onOpenDatePopper={() => setDatePopperOpen(true)}
            interval={interval}
            setInterval={setInterval}
            chartType={chartType}
            setChartType={setChartType}
          />

          <Stack direction="row" justifyContent="flex-end" mt={1} mb={2}>
            <Typography variant="body2">Include Negative Value</Typography>
            <Switch size="small" />
          </Stack>

          <ReactECharts option={option} style={{ height: 420 }} />

          <FilterDrawer
            open={filterDrawerOpen}
            onClose={() => setFilterDrawerOpen(false)}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            expandedFilter={expandedFilter}
            setExpandedFilter={setExpandedFilter}
            selectedFilterValues={selectedFilterValues}
            setSelectedFilterValues={setSelectedFilterValues}
          />
        </Paper>

        <CostTable
          tab={tab}
          tabLabels={GROUP_BY_TABS}
          uniqueDates={uniqueDates}
          processedSeries={processedSeries}
          formatCurrency={formatCurrency}
        />
      </Box>
    </>
  );
};

export default CostExplorer;
