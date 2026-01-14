import { Box } from "@mui/material";

export default function TransferArrows() {
  return (
    <Box
      sx={{
        width: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      {["→", "←"].map((arrow) => (
        <Box
          key={arrow}
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 14px rgba(25,118,210,0.35)",
          }}
        >
          {arrow}
        </Box>
      ))}
    </Box>
  );
}
