import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../assets/images/CloudKeeper_Logo.jpg";
import { logout } from "../utils/auth";

export default function Navbar({ toggleSidebar }) {
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
        {/* ---------------------------------------------------
           BOX 1 → LOGO
        --------------------------------------------------- */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="CloudBalance Logo"
            sx={{ height: 83, objectFit: "contain" }}
          />
        </Box>

        {/* ---------------------------------------------------
           BOX 2 → TOGGLE ICON  (CENTER)
        --------------------------------------------------- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flex: 1,
            pl: "12rem",
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

        {/* ---------------------------------------------------
           BOX 3 → USER INFO + LOGOUT
        --------------------------------------------------- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          {/* User welcome text */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FaRegUserCircle size={24} color="#1976d2" />
            <Box>
              <Typography variant="body2" sx={{ color: "#000" }}>
                Welcome,
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                {username}
              </Typography>
            </Box>
          </Box>

          {/* Logout button */}
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
            <FiLogOut size={18} />
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
