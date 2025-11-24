import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh", pt: "1rem" }}>
      <Sidebar open={open} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={() => setOpen(!open)} />

        <Toolbar />

        <Box
          sx={{
            padding: 3,
            overflowY: "auto",
            flexGrow: 1,
            backgroundColor: "#f5f7fa",
          }}
        >
          <Outlet context={{ open }} />
        </Box>
      </Box>
    </Box>
  );
}
