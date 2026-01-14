import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaPhoneAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { useSidebar } from "./MainLayout";
import { getRole } from "../utils/auth";

const collapsedWidth = 70;
const expandedWidth = 340;

export default function Sidebar() {
  const location = useLocation();
  const { open } = useSidebar();
  const currentWidth = open ? expandedWidth : collapsedWidth;

  const role = getRole()?.toUpperCase() || "";

  const menuItems = [
    {
      label: "User Management",
      icon: <FaUsers size={20} />,
      path: "/dashboard/users",
      roles: ["ADMIN", "READONLY"],
    },
    {
      label: "Onboarding",
      icon: <MdDashboard size={22} />,
      path: "/dashboard/onboarding",
      roles: ["ADMIN", "READONLY"],
    },
    {
      label: "Cost Explorer",
      icon: <BsGraphUpArrow size={22} />,
      path: "/dashboard/cost-explorer",
      roles: ["ADMIN", "READONLY", "CUSTOMER"],
    },
    {
      label: "AWS Services Dashboard",
      icon: <LuLayoutDashboard size={22} />,
      path: "/dashboard/aws-dashboard",
      roles: ["ADMIN", "READONLY", "CUSTOMER"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #ddd",
          paddingTop: "30px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />

      <List sx={{ mt: 1, flexGrow: 1 }}>
        {filteredMenuItems.map((item) => {
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
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#1976d2" : "inherit",
                  minWidth: open ? 35 : 0,
                  mr: open ? 1.5 : "auto",
                  justifyContent: "center",
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

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <ListItemButton
          sx={{
            borderRadius: "8px",
            justifyContent: open ? "flex-start" : "center",
            bgcolor: "#f5f7fa",
            "&:hover": {
              bgcolor: "#e3f2fd",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: open ? 35 : 0,
              justifyContent: "center",
              color: "#1976d2",
            }}
          >
            <FaPhoneAlt size={18} />
          </ListItemIcon>

          {open && (
            <ListItemText
              primary="Contact"
              primaryTypographyProps={{
                fontWeight: 600,
                color: "#1976d2",
              }}
            />
          )}
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
