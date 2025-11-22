// Layout.jsx (Modified - Simplified ml for fixed 60px sidebar)
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

// Use the same width as defined in Sidebar.jsx
const fixedSidebarWidth = 0;

export default function Layout() {
  const [open, setOpen] = useState(true); // 'open' state can now be used for a future expanded state

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar - always visible at 60px */}
      <Sidebar open={open} />

      {/* Main section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // The main content should always start 60px from the left,
          // to clear the always-present sidebar.
          marginLeft: `${fixedSidebarWidth}px`,
        }}
      >
        <Navbar toggleSidebar={() => setOpen(!open)} />

        <Toolbar />

        <Box sx={{ padding: 3, overflowY: "auto", flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
