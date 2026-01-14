import { Box, Button, Paper, Popper, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateRangePopper({
  open,
  anchorEl,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onClose,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper sx={{ p: 2, boxShadow: 3, border: "1px solid #ccc" }}>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="caption" fontWeight="bold">
                Start Date
              </Typography>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={startDate}
                onChange={(v) => onStartChange(v)}
              />
            </Box>
            <Box>
              <Typography variant="caption" fontWeight="bold">
                End Date
              </Typography>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={endDate}
                onChange={(v) => onEndChange(v)}
              />
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" mt={1}>
            <Button size="small" variant="contained" onClick={onClose}>
              Apply & Close
            </Button>
          </Stack>
        </Paper>
      </Popper>
    </LocalizationProvider>
  );
}
