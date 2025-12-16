import { createContext, useContext, useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export default function Layout() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      <Box sx={{ display: "flex", height: "97vh" }}>
        <Sidebar />

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Navbar />

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

          <Box
            sx={{
              height: "34px",
              borderTop: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              pt: "0.8rem",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "#1976d2" }}
            >
              Cloudkeeper 2025 | All Rights Reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
}
