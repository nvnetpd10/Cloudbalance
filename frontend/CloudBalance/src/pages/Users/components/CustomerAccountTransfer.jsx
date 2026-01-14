import { Box, Typography } from "@mui/material";
import AccountCard from "./AccountCard";
import TransferArrows from "./TransferArrows";

export default function CustomerAccountTransfer({
  availableAccounts,
  assignedAccounts,
  loadingAccounts,
  onDragStart,
  onDropToAssigned,
  onDropToAvailable,
}) {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 3,
        display: "flex",
        gap: 3,
        alignItems: "stretch",
        background: "#f9fbff",
        p: 3,
        borderRadius: "14px",
        border: "1px solid #dbe2f1",
      }}
    >
      <Box
        sx={{
          flex: 1,
          minHeight: 320,
          borderRadius: "14px",
          border: "2px solid #1976d2",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropToAvailable}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.8,
            borderBottom: "1px solid #e3e8ef",
            backgroundColor: "#f1f6ff",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        >
          <Typography fontWeight={700} color="#1976d2">
            Choose Account IDs to Associate
          </Typography>
        </Box>

        <Box sx={{ flex: 1, m: 2, overflowY: "auto" }}>
          {loadingAccounts ? (
            <Typography sx={{ p: 2 }}>Loading accounts...</Typography>
          ) : !Array.isArray(availableAccounts) ||
            availableAccounts.length === 0 ? (
            <Typography sx={{ p: 2, color: "#6b7280" }}>
              No accounts available
            </Typography>
          ) : (
            availableAccounts.map((acc) => (
              <AccountCard
                key={acc.id}
                account={acc}
                color="#1976d2"
                border="#e0e7ff"
                hoverBg="#eef2ff"
                onDragStart={onDragStart}
              />
            ))
          )}
        </Box>
      </Box>

      <TransferArrows />

      <Box
        sx={{
          flex: 1,
          minHeight: 320,
          borderRadius: "14px",
          border: "2px solid #43a047",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropToAssigned}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.8,
            borderBottom: "1px solid #e3e8ef",
            backgroundColor: "#f1fbf4",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        >
          <Typography fontWeight={700} color="#2e7d32">
            Associated Account IDs
          </Typography>
        </Box>

        <Box sx={{ flex: 1, m: 2, overflowY: "auto" }}>
          {assignedAccounts.length === 0 ? (
            <Typography sx={{ p: 2, color: "#6b7280" }}>
              Drop accounts here
            </Typography>
          ) : (
            assignedAccounts.map((acc) => (
              <AccountCard
                key={acc.id}
                account={acc}
                color="#2e7d32"
                border="#b7e1c3"
                hoverBg="#e8f5e9"
                onDragStart={onDragStart}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
