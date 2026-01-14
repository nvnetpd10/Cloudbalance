import { Box, Typography } from "@mui/material";

export default function AccountCard({
  account,
  color,
  border,
  hoverBg,
  onDragStart,
}) {
  return (
    <Box
      draggable
      onDragStart={() => onDragStart(account)}
      sx={{
        p: 1.6,
        mb: 1,
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        border: `1px solid ${border}`,
        cursor: "grab",
        "&:hover": { backgroundColor: hoverBg },
      }}
    >
      <Typography fontSize={14}>
        <Box component="span" sx={{ fontWeight: 700, color }}>
          Account Name
        </Box>{" "}
        → {account.accountName}
      </Typography>

      <Typography fontSize={13}>
        <Box component="span" sx={{ fontWeight: 700, color }}>
          Account ID
        </Box>{" "}
        → {account.accountId}
      </Typography>
    </Box>
  );
}
