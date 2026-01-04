import { useState, useEffect } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import axios from "axios";
import { getRole } from "../../utils/auth";

import {
  Button,
  Paper,
  Chip,
  Switch,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import useUsers from "../../components/hooks/Users/useUsers";
import FullScreenLoader from "../../components/common/FullScreenLoader";

export default function Users() {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [pagedUsers, setPagedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = getRole()?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    userId: null,
    newState: null,
    userName: "",
  });

  const formatDateTime = (iso) => {
    if (!iso) return "--";
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const columns = [
    {
      name: "First Name",
      field: "firstName",
      key: "firstName",
      sortable: true,
    },
    { name: "Last Name", field: "lastName", key: "lastName", sortable: true },
    { name: "Email", field: "email", key: "email", sortable: true },
    {
      name: "Role",
      key: "role",
      formatter: (row) => (
        <Chip
          label={row.role}
          size="small"
          style={{
            borderRadius: "4px",
            padding: "4px 6px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            fontSize: "12px",
          }}
        />
      ),
    },
    {
      name: "Last Login",
      field: "lastLogin",
      key: "lastLogin",
      sortable: true,
      formatter: (row) => formatDateTime(row.lastLogin),
    },
  ];

  if (isAdmin) {
    columns.push(
      {
        name: "Active",
        key: "active",
        formatter: (row) => (
          <Switch
            checked={row.active}
            onChange={() =>
              handleActiveToggle(row.id, row.active, row.firstName)
            }
            color="primary"
            size="small"
          />
        ),
      },
      {
        name: "Edit",
        key: "edit",
        formatter: (row) => (
          <FaEdit
            size={18}
            color="#1976d2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/dashboard/users/edit/${row.id}`)}
          />
        ),
      }
    );
  }

  useEffect(() => {
    const initialized = filteredUsers.map((user) => ({
      ...user,
      active: user.active !== undefined ? user.active : true,
    }));
    setPagedUsers(initialized.slice(0, 10));
  }, [searchTerm, users]);

  const handleActiveToggle = (userId, currentState, userName) => {
    setToggleDialog({
      open: true,
      userId,
      newState: !currentState,
      userName,
    });
  };

  const handleConfirmToggle = async () => {
    const { userId, newState } = toggleDialog;
    try {
      await axios.patch(
        `http://localhost:8080/users/${userId}/active`,
        { active: newState },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPagedUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, active: newState } : u))
      );
    } catch (err) {
      alert("Failed to update user status");
    }
    setToggleDialog({
      open: false,
      userId: null,
      newState: null,
      userName: "",
    });
  };

  const handlePageChange = (page, rowsPerPage) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPagedUsers(filteredUsers.slice(start, end));
  };

  return (
    <>
      <Paper
        elevation={2}
        style={{
          padding: "14px 20px",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h3 style={{ margin: 0, color: "#1976d2" }}>USERS</h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #ccc",
            padding: "6px 10px",
            borderRadius: "4px",
            background: "#fff",
            width: "980px",
          }}
        >
          <FaSearch size={18} color="#1976d2" />
          <input
            type="text"
            placeholder="Search user by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "14px" }}
          />
        </div>

        {isAdmin && (
          <Button
            variant="contained"
            style={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              paddingLeft: 18,
              paddingRight: 18,
            }}
            onClick={() => navigate("/dashboard/users/add")}
          >
            Add New User
          </Button>
        )}
      </Paper>

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {loading ? (
          <FullScreenLoader />
        ) : (
          <DataTable columns={columns} rows={pagedUsers} />
        )}

        {!loading && (
          <Pagination
            total={filteredUsers.length}
            onPageChange={handlePageChange}
          />
        )}
      </Box>

      <Dialog
        open={toggleDialog.open}
        onClose={() => setToggleDialog({ ...toggleDialog, open: false })}
      >
        <DialogTitle>
          {toggleDialog.newState ? "Activate User" : "Deactivate User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            <strong>{toggleDialog.newState ? "activate" : "deactivate"}</strong>{" "}
            {toggleDialog.userName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setToggleDialog({ ...toggleDialog, open: false })}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmToggle}
            variant="contained"
            color={toggleDialog.newState ? "primary" : "error"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
