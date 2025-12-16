import { React, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Switch,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const CostExplorer = () => {
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeBtnStyle = {
    bgcolor: "primary.main",
    color: "#fff",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  };

  const inactiveBtnStyle = {
    color: "primary.main",
    borderColor: "primary.main",
  };

  const option = {
    tooltip: { trigger: "axis" },
    legend: {
      bottom: 0,
      type: "scroll",
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "18%",
      containLabel: true,
    },
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
    yAxis: {
      type: "value",
      name: "Cost ($)",
    },
    series: [
      {
        name: "AWS Service",
        type: "bar",
        data: [36000, 40000, 35000, 37000, 33000, 31000],
      },
      {
        name: "Amazon Appstore",
        type: "bar",
        data: [25000, 24000, 26000, 24000, 23500, 22000],
      },
      {
        name: "CK Discount",
        type: "bar",
        data: [5000, 6000, 4500, 5200, 4800, 5100],
      },
    ],
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight={600} mt={1}>
              Cost Explorer
            </Typography>

            <Typography
              sx={{
                mt: 1,
                mb: 1,
                display: "inline-block",
                borderRadius: "20px",
                fontSize: "14px",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              How to always be aware of cost changes and history.
            </Typography>
          </Box>

          <Button variant="contained">Recent Reports</Button>
        </Stack>
      </Box>

      <Box sx={{ width: "98%" }}>
        <Paper sx={{ p: 2, width: "100%", overflowX: "hidden" }}>
          <Box
            sx={{
              mt: 2,
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography fontWeight={600} sx={{ color: "grey" }}>
              Group By:
            </Typography>

            <Button
              size="small"
              variant={tab === 0 ? "contained" : "outlined"}
              sx={tab === 0 ? activeBtnStyle : inactiveBtnStyle}
              onClick={() => setTab(0)}
            >
              Service
            </Button>

            <Button
              size="small"
              variant={tab === 1 ? "contained" : "outlined"}
              sx={tab === 1 ? activeBtnStyle : inactiveBtnStyle}
              onClick={() => setTab(1)}
            >
              Instance Type
            </Button>

            <Button
              size="small"
              variant={tab === 2 ? "contained" : "outlined"}
              sx={tab === 2 ? activeBtnStyle : inactiveBtnStyle}
              onClick={() => setTab(2)}
            >
              Account ID
            </Button>

            <Button
              size="small"
              variant={tab === 3 ? "contained" : "outlined"}
              sx={tab === 3 ? activeBtnStyle : inactiveBtnStyle}
              onClick={() => setTab(3)}
            >
              Usage Type
            </Button>

            <Button
              size="small"
              variant={tab === 4 ? "contained" : "outlined"}
              sx={tab === 4 ? activeBtnStyle : inactiveBtnStyle}
              onClick={() => setTab(4)}
            >
              Platform
            </Button>

            <Button
              size="small"
              variant={tab === 5 ? "contained" : "outlined"}
              sx={tab === 5 ? activeBtnStyle : inactiveBtnStyle}
              onClick={() => setTab(5)}
            >
              Region
            </Button>

            <Button
              size="small"
              variant="text"
              onClick={handleMoreClick}
              endIcon={
                anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
              sx={{
                color: "primary.main",
                textTransform: "none",
                minHeight: "32px",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
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
            mt={2}
          >
            <Typography variant="body2">Costs ($)</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Button size="small" variant="outlined">
                01-Jun-2025 – 30-Nov-2025
              </Button>
              <Button size="small" variant="outlined">
                Daily
              </Button>
              <Button size="small" variant="contained">
                Monthly
              </Button>
              <Button size="small" variant="outlined">
                📊
              </Button>
              <Button size="small" variant="outlined">
                📋
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" mt={1} mb={2}>
            <Typography variant="body2">Include Negative Value</Typography>
            <Switch size="small" />
          </Stack>

          <Box sx={{ width: "100%", overflowX: "hidden" }}>
            <ReactECharts
              option={option}
              style={{ height: 420, width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default CostExplorer;
