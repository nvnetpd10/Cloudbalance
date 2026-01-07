
import { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Chip,
  Switch,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../utils/auth"; // Role utility import ki
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import FullScreenLoader from "../../components/common/FullScreenLoader";
import useOnBoarding from "../../components/hooks/OnBoarding/useOnBoarding";

export default function Onboarding() {
  const navigate = useNavigate();
  const { users: accounts, lloading } = useOnBoarding();
  const [pagedAccounts, setPagedAccounts] = useState([]);

  // LOGIC: Case-insensitive role check
  const userRole = getRole()?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    if (accounts.length) {
      setPagedAccounts(accounts.slice(0, 5));
    }
  }, [accounts]);

  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    accountId: null,
    newState: null,
  });

  const handleConfirmToggle = () => {
    const { accountId, newState } = toggleDialog;
    setPagedAccounts((prev) =>
      prev.map((acc) =>
        acc.accountId === accountId ? { ...acc, scheduler: newState } : acc
      )
    );
    setToggleDialog({ open: false, accountId: null, newState: null });
  };

  const handlePageChange = (page, rowsPerPage) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPagedAccounts(accounts.slice(start, end));
  };

  const columns = [
    {
      name: "Account ID",
      key: "accountId",
      formatter: (row) => (
        <Box>
          <div style={{ fontWeight: 600 }}>
            {row.accountId} ({row.accountName})
          </div>
          <Chip
            label={row.environment}
            size="small"
            sx={{
              mt: 0.5,
              fontSize: "11px",
              backgroundColor:
                row.environment === "Production" ? "#ffecec" : "#eef7ea",
              color: row.environment === "Production" ? "#d32f2f" : "#2e7d32",
            }}
          />
        </Box>
      ),
    },
    {
      name: "Status",
      key: "status",
      formatter: () => (
        <Chip
          label="Verified"
          size="small"
          color="success"
          variant="outlined"
        />
      ),
    },
    {
      name: "Auto Remediation",
      key: "autoRemediation",
      formatter: (row) => (
        <Button size="small" variant="outlined">
          {row.autoRemediation}
        </Button>
      ),
    },
    {
      name: "Scheduler",
      key: "scheduler",
      formatter: (row) => (
        <Switch
          checked={row.scheduler}
          size="small"
          // LOGIC: ReadOnly ke liye switch disable kar diya
          disabled={!isAdmin} 
          onChange={() =>
            setToggleDialog({
              open: true,
              accountId: row.accountId,
              newState: !row.scheduler,
            })
          }
        />
      ),
    },
    {
      name: "Access Type",
      key: "accessTypes",
      formatter: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {row.accessTypes.map((type) => (
            <Chip key={type} label={type} size="small" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      name: "Actions",
      key: "actions",
      formatter: () => "-",
    },
  ];

  return (
    <>
      <Box sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Accounts
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Displaying all connected AWS accounts</h3>

        {/* LOGIC: Link Account button sirf ADMIN ko dikhega */}
        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/onboarding/create-iam-role")}
          >
            + Link Account
          </Button>
        )}
      </Paper>

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {lloading ? (
          <FullScreenLoader />
        ) : (
          <>
            <DataTable columns={columns} rows={pagedAccounts} />
            <Pagination
              total={accounts.length}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Box>

      <Dialog open={toggleDialog.open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {toggleDialog.newState ? "Enable Scheduler" : "Disable Scheduler"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            <strong>{toggleDialog.newState ? "enable" : "disable"}</strong>{" "}
            scheduler for account <strong>{toggleDialog.accountId}</strong>?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setToggleDialog({
                open: false,
                accountId: null,
                newState: null,
              })
            }
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmToggle} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}