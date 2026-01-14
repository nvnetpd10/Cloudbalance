import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CostTable({
  tab,
  tabLabels,
  uniqueDates,
  processedSeries,
  formatCurrency,
}) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <TableContainer>
        <Table size="small" sx={{ border: "1px solid", borderColor: "divider" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.100" }}>
              <TableCell
                sx={{
                  fontWeight: 600,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {tabLabels[tab]}
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
  );
}
