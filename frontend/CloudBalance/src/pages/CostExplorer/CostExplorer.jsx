import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import FullScreenLoader from "../../components/common/FullScreenLoader";

import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Switch,
  Menu,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import BarChartIcon from "@mui/icons-material/BarChart";
import TuneIcon from "@mui/icons-material/Tune";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CostExplorer = () => {
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const [startDate, setStartDate] = useState(dayjs("2025-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2025-01-04"));

  const [interval, setInterval] = useState("monthly");
  const [chartType, setChartType] = useState("grouped");

  const [open, setOpen] = useState(false);
  const rangeRef = useRef(null);

  const handleMoreClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});

  const [rawData, setRawData] = useState([]); // This stores the list from Snowflake
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // 1. Get the token from wherever you store it (e.g., localStorage)
      const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")

      const columns = [
        "SERVICE",
        "INSTANCE_TYPE",
        "ACCOUNT_ID",
        "USAGE_TYPE",
        "PLATFORM",
        "REGION",
      ];
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
              // 2. ADD THIS LINE TO FIX THE ERROR
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestPayload),
          }
        );

        if (!response.ok) {
          // If response is 403, it means the token is invalid or expired
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, "dsasas");

        setRawData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [startDate, endDate, tab]);

  const { processedSeries, uniqueDates } = useMemo(() => {
    if (!rawData || rawData.length === 0)
      return { processedSeries: [], uniqueDates: [] };

    // 1. Normalize dates from the backend to "YYYY-MM-DD"
    const dates = [
      ...new Set(
        rawData.map((item) => dayjs(item.billDate).format("YYYY-MM-DD"))
      ),
    ].sort();

    // 2. Get unique groups (e.g., "Amazon EC2")
    const groups = [...new Set(rawData.map((item) => item.groupKey))];

    const seriesData = groups.map((groupName) => {
      const dataPoints = dates.map((dateStr) => {
        // Find the record where group matches AND date matches the normalized string
        const record = rawData.find((item) => {
          const itemDate = dayjs(item.billDate).format("YYYY-MM-DD");
          return item.groupKey === groupName && itemDate === dateStr;
        });

        return record ? record.totalCost : 0;
      });

      return {
        name: groupName,
        data: dataPoints,
      };
    });

    return {
      processedSeries: seriesData,
      // Format for X-axis display (e.g., "01 Jan")
      uniqueDates: dates.map((d) => dayjs(d).format("DD MMM")),
    };
  }, [rawData]);

  // 3. Update ECharts Option
  const getSeries = () => {
    return processedSeries.map((s) => ({
      ...s,
      type: chartType === "line" ? "line" : "bar",
      stack: chartType === "stacked" ? "total" : null,
      smooth: true,
    }));
  };

  const option = {
    tooltip: { trigger: "axis" },
    legend: { bottom: 0, type: "scroll" }, // scroll helps if there are many services
    grid: { left: "3%", right: "3%", bottom: "18%", containLabel: true },
    xAxis: {
      type: "category",
      data: uniqueDates,
    },
    yAxis: { type: "value", name: "Cost ($)" },
    series: getSeries(),
  };

  const activeBtnStyle = {
    bgcolor: "primary.main",
    color: "#fff",
    "&:hover": { bgcolor: "primary.dark" },
  };

  const inactiveBtnStyle = {
    color: "primary.main",
    borderColor: "primary.main",
  };

  const FILTERS = [
    "Service",
    "Instance Type",
    "Account ID",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group",
    "Purchase Option",
    "API Operation",
    "Resource",
    "Charge Type",
    "Availability Zone",
    "Tenancy",
    "Legal Entity",
    "Billing Entity",
  ];
  const FILTER_VALUES = {
    Service: ["EC2", "S3", "RDS", "Lambda"],
    "Instance Type": ["t3.micro", "t3.medium", "m5.large"],
    "Account ID": ["123456789012", "987654321098"],
    Region: ["us-east-1", "us-west-2", "ap-south-1"],
  };

  const toggleExpand = (label) => {
    setExpandedFilter((prev) => (prev === label ? null : label));
  };

  const toggleFilter = (label) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleFilterValue = (label, value) => {
    setSelectedFilterValues((prev) => ({
      ...prev,
      [label]: {
        ...(prev[label] || {}),
        [value]: !prev[label]?.[value],
      },
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setSelectedFilterValues({});
    setExpandedFilter(null);
  };

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Popper
          open={open}
          anchorEl={rangeRef.current}
          placement="bottom-start"
        >
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={startDate}
                onChange={(v) => setStartDate(v)}
              />
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={endDate}
                onChange={(v) => setEndDate(v)}
              />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" mt={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </Stack>
          </Paper>
        </Popper>
      </LocalizationProvider> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Popper
          open={open}
          anchorEl={rangeRef.current}
          placement="bottom-start"
        >
          <Paper sx={{ p: 2, boxShadow: 3, border: "1px solid #ccc" }}>
            <Stack direction="row" spacing={2}>
              <Box>
                <Typography variant="caption" fontWeight="bold">
                  Start Date
                </Typography>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={startDate}
                  // Triggered when user clicks a day
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight="bold">
                  End Date
                </Typography>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={endDate}
                  // Triggered when user clicks a day
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" mt={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setOpen(false)}
              >
                Apply & Close
              </Button>
            </Stack>
          </Paper>
        </Popper>
      </LocalizationProvider>

      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Cost Explorer
            </Typography>
            <Typography fontSize={14}>
              How to always be aware of cost changes and history.
            </Typography>
          </Box>
          <Button variant="contained">Recent Reports</Button>
        </Stack>
      </Box>

      <Box sx={{ position: "relative", minHeight: 600 }}>
        {loading && <FullScreenLoader />}

        <Paper sx={{ p: 2, position: "relative", overflow: "hidden" }}>
          <Box
            sx={{
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "6px",
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography fontWeight={600} sx={{ color: "grey" }}>
              Group By:
            </Typography>

            {[
              "Service",
              "Instance Type",
              "Account ID",
              "Usage Type",
              "Platform",
              "Region",
            ].map((label, index) => (
              <Button
                key={label}
                size="small"
                variant={tab === index ? "contained" : "outlined"}
                sx={tab === index ? activeBtnStyle : inactiveBtnStyle}
                onClick={() => setTab(index)}
              >
                {label}
              </Button>
            ))}

            <Button
              size="small"
              variant="text"
              onClick={handleMoreClick}
              endIcon={
                anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
            >
              More
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Usage Type Group</MenuItem>
              <MenuItem onClick={handleClose}>Purchase Option</MenuItem>
              <MenuItem onClick={handleClose}>Resource</MenuItem>
              <MenuItem onClick={handleClose}>Charge Type</MenuItem>
              <MenuItem onClick={handleClose}>Availability Zone</MenuItem>
              <MenuItem onClick={handleClose}>Tenancy</MenuItem>
              <MenuItem onClick={handleClose}>Legal Entity</MenuItem>
              <MenuItem onClick={handleClose}>Billing Entity</MenuItem>
            </Menu>

            {/* RIGHT ICON */}
            <Box sx={{ ml: "auto" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ minWidth: 36, px: 1 }}
                onClick={() => setFilterDrawerOpen(true)}
              >
                <TuneIcon fontSize="small" />
              </Button>
            </Box>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2">Costs ($)</Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                ref={rangeRef}
                size="small"
                sx={{ width: 230, cursor: "pointer" }}
                value={`${startDate.format("DD-MMM-YYYY")} – ${endDate.format(
                  "DD-MMM-YYYY"
                )}`}
                InputProps={{ readOnly: true }}
                onClick={() => setOpen(true)}
              />

              <ToggleButtonGroup
                size="small"
                exclusive
                value={interval}
                onChange={(e, v) => v && setInterval(v)}
                sx={{
                  "& .MuiToggleButton-root": {
                    color: "primary.main",
                    borderColor: "primary.main",
                  },
                  "& .MuiToggleButton-root.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "#fff",
                    "&:hover": { backgroundColor: "primary.dark" },
                  },
                }}
              >
                <ToggleButton value="daily">Daily</ToggleButton>
                <ToggleButton value="monthly">Monthly</ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                size="small"
                exclusive
                value={chartType}
                onChange={(e, v) => v && setChartType(v)}
                sx={{
                  "& .MuiToggleButton-root": {
                    color: "primary.main",
                    borderColor: "primary.main",
                  },
                  "& .MuiToggleButton-root.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "#fff",
                    "&:hover": { backgroundColor: "primary.dark" },
                  },
                }}
              >
                <ToggleButton value="grouped">
                  <BarChartIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="line">
                  <ShowChartIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="stacked">
                  <StackedBarChartIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" mt={1} mb={2}>
            <Typography variant="body2">Include Negative Value</Typography>
            <Switch size="small" />
          </Stack>

          <ReactECharts option={option} style={{ height: 420 }} />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: filterDrawerOpen ? 0 : "-100%",
              width: 320,
              height: "100%",
              bgcolor: "background.paper",
              borderLeft: "1px solid",
              borderColor: "divider",
              p: 2,
              transition: "right 0.25s ease",
              zIndex: 10,
              pointerEvents: filterDrawerOpen ? "auto" : "none",
              overflowY: "auto",
            }}
          >
            {/* HEADER */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography fontWeight={600}>Filters</Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  size="small"
                  variant="text"
                  onClick={resetFilters}
                  sx={{ fontSize: 12 }}
                >
                  Reset All
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setFilterDrawerOpen(false)}
                >
                  Close
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 1 }}
            />

            <Stack spacing={0}>
              {FILTERS.map((label) => (
                <Box key={label}>
                  {/* FILTER ROW */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      py: 0.75,
                      px: 0.5,
                      cursor: "pointer",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                    onClick={() => toggleExpand(label)}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <input
                        type="checkbox"
                        checked={!!selectedFilters[label]}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleFilter(label);
                        }}
                      />
                      <Typography fontSize={13}>{label}</Typography>
                    </Stack>

                    <Typography fontSize={11} color="text.secondary">
                      Include Only
                    </Typography>
                  </Stack>

                  {/* DROPDOWN */}
                  {expandedFilter === label && FILTER_VALUES[label] && (
                    <Box sx={{ pl: 3, pr: 1, py: 1, bgcolor: "grey.50" }}>
                      {/* INFO */}
                      <Typography fontSize={11} color="text.secondary" mb={0.5}>
                        No filters currently added.
                      </Typography>

                      {/* SEARCH */}
                      <TextField
                        size="small"
                        placeholder="Search"
                        fullWidth
                        sx={{ mb: 1 }}
                      />

                      {/* COUNT */}
                      <Typography fontSize={11} color="text.secondary" mb={0.5}>
                        Showing {FILTER_VALUES[label].length} results
                      </Typography>

                      {/* SELECT ALL */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={0.5}
                      >
                        <Checkbox
                          size="small"
                          checked={FILTER_VALUES[label].every(
                            (v) => selectedFilterValues[label]?.[v]
                          )}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFilterValues((prev) => ({
                              ...prev,
                              [label]: Object.fromEntries(
                                FILTER_VALUES[label].map((v) => [v, checked])
                              ),
                            }));
                          }}
                        />
                        <Typography fontSize={12}>Select All</Typography>
                      </Stack>

                      {/* VALUES LIST */}
                      <Box sx={{ maxHeight: 180, overflowY: "auto", mb: 1 }}>
                        {FILTER_VALUES[label].map((value) => (
                          <Stack
                            key={value}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ py: 0.25 }}
                          >
                            <Checkbox
                              size="small"
                              checked={!!selectedFilterValues[label]?.[value]}
                              onChange={() => toggleFilterValue(label, value)}
                            />
                            <Typography fontSize={12}>{value}</Typography>
                          </Stack>
                        ))}
                      </Box>

                      {/* ACTION BUTTONS */}
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={1}
                      >
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => setExpandedFilter(null)}
                        >
                          Close
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => setExpandedFilter(null)}
                        >
                          Apply
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>

        {/* Data Table in separate Paper */}
        <Paper sx={{ p: 2, mt: 2 }}>
          <TableContainer>
            <Table
              size="small"
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.100" }}>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {
                      [
                        "Service",
                        "Instance Type",
                        "Account ID",
                        "Usage Type",
                        "Platform",
                        "Region",
                      ][tab]
                    }
                  </TableCell>

                  {uniqueDates.map((date) => (
                    <TableCell
                      key={date}
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {date}
                    </TableCell>
                  ))}

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {processedSeries.map((group) => (
                  <TableRow key={group.name}>
                    <TableCell sx={{ fontWeight: 600, color: "primary.main" }}>
                      {group.name}
                    </TableCell>

                    {group.data.map((value, index) => (
                      <TableCell key={index} align="right">
                        {formatCurrency(value)}
                      </TableCell>
                    ))}

                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {formatCurrency(group.data.reduce((a, b) => a + b, 0))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default CostExplorer;
