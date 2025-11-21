import { Button } from "@mui/material";
import { logout } from "../../utils/auth";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          logout();
          window.location.href = "/login";
        }}
      >
        Logout
      </Button>
    </div>
  );
}
