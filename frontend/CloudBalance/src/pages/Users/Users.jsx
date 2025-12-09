import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

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

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [alertDialog, setAlertDialog] = useState({ open: false, message: "" });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
    userName: "",
  });
  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    userId: null,
    newState: null,
    userName: "",
  });

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
    },

    {
      name: "Active",
      key: "active",
      formatter: (row) => (
        <Switch
          checked={row.active}
          onChange={() => handleActiveToggle(row.id, row.active, row.firstName)}
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
    },
  ];

  useEffect(() => {
    const filtered = users.filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    const initialized = filtered.map((user) => ({
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

  const handleConfirmToggle = () => {
    const { userId, newState } = toggleDialog;
    const updatedPagedUsers = pagedUsers.map((user) =>
      user.id === userId ? { ...user, active: newState } : user
    );
    setPagedUsers(updatedPagedUsers);

    setAlertDialog({
      open: true,
      message: `User has been ${
        newState ? "activated" : "deactivated"
      } successfully!`,
    });

    setToggleDialog({
      open: false,
      userId: null,
      newState: null,
      userName: "",
    });
  };

  const handleCancelToggle = () => {
    setToggleDialog({
      open: false,
      userId: null,
      newState: null,
      userName: "",
    });
  };

  const handleConfirmDelete = () => {
    const id = deleteDialog.userId;
    const updatedPaged = pagedUsers.filter((u) => u.id !== id);
    setPagedUsers(updatedPaged);

    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) users.splice(index, 1);

    setDeleteDialog({ open: false, userId: null, userName: "" });
  };

  const handleCloseDelete = () => {
    setDeleteDialog({ open: false, userId: null, userName: "" });
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
        onClose={handleCancelToggle}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { p: 3, borderRadius: "12px", boxShadow: 8 } }}
      >
        <DialogTitle sx={{ fontSize: "22px", fontWeight: 600 }}>
          {toggleDialog.newState ? "Activate User" : "Deactivate User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "16px", color: "#333" }}>
            Are you sure you want to{" "}
            <strong>{toggleDialog.newState ? "activate" : "deactivate"}</strong>{" "}
            {toggleDialog.userName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCancelToggle}
            sx={{ textTransform: "none", px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmToggle}
            color={toggleDialog.newState ? "primary" : "error"}
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600, px: 3 }}
          >
            {toggleDialog.newState ? "Activate" : "Deactivate"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDelete}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { p: 3, borderRadius: "12px", boxShadow: 8 } }}
      >
        <DialogTitle sx={{ fontSize: "22px", fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "16px", color: "#333" }}>
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.userName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDelete}
            sx={{ textTransform: "none", px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600, px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
