import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function FullScreenLoader() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
        zIndex: 10,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}
