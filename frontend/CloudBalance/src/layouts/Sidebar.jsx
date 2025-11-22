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

const collapsedWidth = 70;
const expandedWidth = 340;

export default function Sidebar({ open }) {
  const location = useLocation();

  const currentWidth = open ? expandedWidth : collapsedWidth;

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

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/dashboard/users" && location.pathname === "/dashboard");

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #ddd",
          paddingTop: "30px",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar />

      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                paddingY: "18px",
                bgcolor: active ? "#e0f0ff" : "transparent",
                borderLeft: active
                  ? "4px solid #1976d2"
                  : "4px solid transparent",
                "&:hover": { bgcolor: "#e0f0ff" },
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#1976d2" : "inherit",
                  minWidth: open ? 35 : 0,
                  mr: open ? 1.5 : "auto",
                  justifyContent: "center",
                  // 🚀 FIX: Add margin-bottom (mb) when sidebar is closed (open === false)
                  mb: open ? 0 : 1.5,
                }}
              >
                {item.icon}
              </ListItemIcon>

              {open && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? "bold" : "normal",
                    color: active ? "#1976d2" : "inherit",
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
