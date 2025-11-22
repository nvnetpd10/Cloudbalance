import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { FaUsers } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const drawerWidth = 380;

export default function Sidebar({ open }) {
  const location = useLocation();

  const menuItems = [
    {
      label: "User Management",
      icon: <FaUsers size={20} />,
      path: "/dashboard/users",
    },
    {
      label: "Onboarding",
      icon: <MdDashboard size={22} />,
      path: "/dashboard/onboarding",
    },
    {
      label: "Cost Explorer",
      icon: <BsGraphUpArrow size={22} />,
      path: "/dashboard/cost-explorer",
    },
    {
      label: "AWS Services Dashboard",
      icon: <LuLayoutDashboard size={22} />,
      path: "/dashboard/aws-dashboard",
    },
  ];

  // Make "User Management" active when URL = /dashboard
  const isActive = (path) =>
    location.pathname === path ||
    (path === "/dashboard/users" && location.pathname === "/dashboard");

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #ddd",
          paddingTop: "30px",
        },
      }}
    >
      <Toolbar />

      <List sx={{ mt: 1 }}>
        {" "}
        {/* optional extra spacing */}
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                py: 2.2,
                bgcolor: active ? "#e0f0ff" : "transparent",
                borderLeft: active
                  ? "4px solid #1976d2"
                  : "4px solid transparent",
                "&:hover": { bgcolor: "#e0f0ff" },
              }}
            >
              <ListItemIcon sx={{ color: active ? "#1976d2" : "inherit" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? "bold" : "normal",
                  color: active ? "#1976d2" : "inherit",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
