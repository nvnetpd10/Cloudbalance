import { useState, useEffect } from "react";
import axios from "axios";
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
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import FullScreenLoader from "../../components/common/FullScreenLoader";

export default function Onboarding() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [pagedAccounts, setPagedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    accountId: null,
    newState: null,
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        const res = await axios.get(
          "https://mocki.io/v1/9c33ce58-d41a-4161-9c9a-356fface37d5"
        );
        setAccounts(res.data);
        setPagedAccounts(res.data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleSchedulerToggle = (accountId, currentState) => {
    setToggleDialog({
      open: true,
      accountId,
      newState: !currentState,
    });
  };

  const handleConfirmToggle = () => {
    const { accountId, newState } = toggleDialog;
    const updated = pagedAccounts.map((acc) =>
      acc.accountId === accountId ? { ...acc, scheduler: newState } : acc
    );
    setPagedAccounts(updated);
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
      sortable: true,
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
          onChange={() => handleSchedulerToggle(row.accountId, row.scheduler)}
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

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/onboarding/create-iam-role")}
        >
          + Link Account
        </Button>
      </Paper>

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {loading ? (
          <FullScreenLoader />
        ) : (
          <DataTable columns={columns} rows={pagedAccounts} />
        )}

        {!loading && (
          <Pagination total={accounts.length} onPageChange={handlePageChange} />
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
