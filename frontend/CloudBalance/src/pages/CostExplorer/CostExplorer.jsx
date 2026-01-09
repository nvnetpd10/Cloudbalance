import React, { useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
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

  const [startDate, setStartDate] = useState(dayjs("2025-06-01"));
  const [endDate, setEndDate] = useState(dayjs("2025-11-30"));

  const [interval, setInterval] = useState("monthly");
  const [chartType, setChartType] = useState("grouped");

  const [open, setOpen] = useState(false);
  const rangeRef = useRef(null);

  const handleMoreClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const activeBtnStyle = {
    bgcolor: "primary.main",
    color: "#fff",
    "&:hover": { bgcolor: "primary.dark" },
  };

  const inactiveBtnStyle = {
    color: "primary.main",
    borderColor: "primary.main",
  };

  const baseSeries = [
    { name: "AWS Service", data: [36000, 40000, 35000, 37000, 33000, 31000] },
    {
      name: "Amazon Appstore",
      data: [25000, 24000, 26000, 24000, 23500, 22000],
    },
    { name: "CK Discount", data: [5000, 6000, 4500, 5200, 4800, 5100] },
  ];

  const months = [
    "Jun 2025",
    "Jul 2025",
    "Aug 2025",
    "Sep 2025",
    "Oct 2025",
    "Nov 2025",
  ];

  const getSeries = () => {
    if (chartType === "line")
      return baseSeries.map((s) => ({ ...s, type: "line", smooth: true }));
    if (chartType === "stacked")
      return baseSeries.map((s) => ({ ...s, type: "bar", stack: "total" }));
    return baseSeries.map((s) => ({ ...s, type: "bar" }));
  };

  const option = {
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    grid: { left: "3%", right: "3%", bottom: "18%", containLabel: true },
    xAxis: {
      type: "category",
      data: months,
    },
    yAxis: { type: "value", name: "Cost ($)" },
    series: getSeries(),
  };

  // Calculate totals for each service
  const getRowTotal = (data) => {
    return data.reduce((sum, value) => sum + value, 0);
  };

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
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
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
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
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography fontWeight={600}>Filters</Typography>
            <Button size="small" onClick={() => setFilterDrawerOpen(false)}>
              Close
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Customize cost explorer settings here.
          </Typography>

          <Stack spacing={1}>
            <Button variant="outlined" size="small">
              Cost Allocation Tags
            </Button>
            <Button variant="outlined" size="small">
              Linked Accounts
            </Button>
            <Button variant="outlined" size="small">
              Charge Type
            </Button>
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
                  Service
                </TableCell>
                {months.map((month) => (
                  <TableCell
                    key={month}
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {month}
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
              {baseSeries.map((service) => (
                <TableRow key={service.name}>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {service.name}
                  </TableCell>
                  {service.data.map((value, index) => (
                    <TableCell
                      key={index}
                      align="right"
                      sx={{ border: "1px solid", borderColor: "divider" }}
                    >
                      {formatCurrency(value)}
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
                    {formatCurrency(getRowTotal(service.data))}
                  </TableCell>
                </TableRow>
              ))}
              {/* Total Row */}
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  Total
                </TableCell>
                {months.map((month, monthIndex) => {
                  const monthTotal = baseSeries.reduce(
                    (sum, service) => sum + service.data[monthIndex],
                    0
                  );
                  return (
                    <TableCell
                      key={month}
                      align="right"
                      sx={{
                        fontWeight: 600,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {formatCurrency(monthTotal)}
                    </TableCell>
                  );
                })}
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {formatCurrency(
                    baseSeries.reduce(
                      (sum, service) => sum + getRowTotal(service.data),
                      0
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CostExplorer;
