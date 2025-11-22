import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

export default function Layout() {
  const [open, setOpen] = useState(true); // sidebar open by default

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={open} /> {/* 🔥 Send open to Sidebar */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar fixed on top */}
        <Navbar toggleSidebar={() => setOpen(!open)} /> {/* 🔥 Pass toggle */}
        {/* Prevent overlap */}
        <Toolbar />
        <Box sx={{ padding: 3, overflowY: "auto", flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
