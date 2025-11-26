import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../assets/images/CloudKeeper_Logo.jpg";
import { logout } from "../utils/auth";
import { useSidebar } from "./MainLayout";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  const username = "Navneet Tiwari";

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "#fff",
        color: "#000",
        paddingX: 2,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="CloudBalance Logo"
          sx={{ height: 83 }}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "9rem",
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: "#1976d2",
              border: "1px solid #1976d2",
              borderRadius: "8px",
              padding: "6px",
            }}
          >
            <FiMenu size={26} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FaRegUserCircle size={24} color="#1976d2" />
            <Box>
              <Typography variant="body2">Welcome,</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                {username}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#1976d2",
              color: "#1976d2",
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 2.5,
              height: 38,
              display: "flex",
              gap: 1,
            }}
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
          >
            <FiLogOut size={18} /> Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
