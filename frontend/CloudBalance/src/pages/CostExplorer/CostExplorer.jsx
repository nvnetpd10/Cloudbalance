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
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
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
      data: [
        "Jun 2025",
        "Jul 2025",
        "Aug 2025",
        "Sep 2025",
        "Oct 2025",
        "Nov 2025",
      ],
    },
    yAxis: { type: "value", name: "Cost ($)" },
    series: getSeries(),
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

      <Paper sx={{ p: 2 }}>
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
                height: 28,
                "& .MuiToggleButton-root": {
                  minHeight: 28,
                  px: 1.5,
                  fontSize: 12,
                  textTransform: "none",
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
                height: 28,
                "& .MuiToggleButton-root": {
                  minHeight: 28,
                  px: 1.5,
                  fontSize: 12,
                  textTransform: "none",
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
      </Paper>
    </>
  );
};

export default CostExplorer;
