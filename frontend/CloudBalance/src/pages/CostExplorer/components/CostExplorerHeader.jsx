import { Box, Button, Stack, Typography } from "@mui/material";

export default function CostExplorerHeader() {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
  );
}
