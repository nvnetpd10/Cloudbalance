import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TuneIcon from "@mui/icons-material/Tune";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { MORE_GROUP_BY } from "./constants";

export default function ControlsBar({
  tab,
  setTab,
  tabs,
  anchorEl,
  onMoreClick,
  onMoreClose,
  onOpenFilterDrawer,
  rangeRef,
  startDate,
  endDate,
  onOpenDatePopper,
  interval,
  setInterval,
  chartType,
  setChartType,
}) {
  const activeBtnStyle = {
    bgcolor: "primary.main",
    color: "#fff",
    "&:hover": { bgcolor: "primary.dark" },
  };

  const inactiveBtnStyle = {
    color: "primary.main",
    borderColor: "primary.main",
  };

  return (
    <>
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

        {tabs.map((label, index) => (
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
          onClick={onMoreClick}
          endIcon={
            anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          More
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMoreClose}
        >
          {MORE_GROUP_BY.map((item) => (
            <MenuItem key={item} onClick={onMoreClose}>
              {item}
            </MenuItem>
          ))}
        </Menu>

        <Box sx={{ ml: "auto" }}>
          <Button
            size="small"
            variant="outlined"
            sx={{ minWidth: 36, px: 1 }}
            onClick={onOpenFilterDrawer}
          >
            <TuneIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
            onClick={onOpenDatePopper}
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
    </>
  );
}
