import { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Switch,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import useAwsEC2 from "../../../components/hooks/AWS/useAwsEC2";
import DataTable from "../../../components/common/DataTable";
import Pagination from "../../../components/common/DataPagination";
import FullScreenLoader from "../../../components/common/FullScreenLoader";

export default function EC2Table() {
  const { resources, loading } = useAwsEC2();
  const [pagedResources, setPagedResources] = useState([]);
  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    resourceId: null,
    newState: null,
    resourceName: "",
  });

  const columns = [
    {
      name: "Account ID",
      field: "accountId",
      key: "accountId",
      sortable: true,
    },
    {
      name: "Resource ID",
      field: "resourceId",
      key: "resourceId",
      sortable: true,
    },
    {
      name: "Resource Name",
      field: "resourceName",
      key: "resourceName",
      sortable: true,
    },
    {
      name: "Region",
      field: "region",
      key: "region",
      sortable: true,
    },
    {
      name: "Status",
      key: "status",
      formatter: (row) => (
        <Chip
          label={row.status}
          size="small"
          style={{
            borderRadius: "4px",
            padding: "4px 6px",
            backgroundColor: row.status === "running" ? "#4caf50" : "red",
            color: "#fff",
            fontWeight: 600,
            fontSize: "12px",
          }}
        />
      ),
    },
    {
      name: "Potential Saving",
      field: "potentialSaving",
      key: "potentialSaving",
      sortable: true,
    },
    {
      name: "Enable Scheduler",
      key: "enableScheduler",
      formatter: (row) => (
        <Switch
          checked={row.enableScheduler}
          onChange={() =>
            handleSchedulerToggle(
              row.resourceId,
              row.enableScheduler,
              row.resourceName
            )
          }
          color="primary"
          size="small"
        />
      ),
    },
  ];

  useEffect(() => {
    const initialized = resources.map((resource) => ({
      ...resource,
      enableScheduler:
        resource.enableScheduler !== undefined
          ? resource.enableScheduler
          : false,
    }));
    setPagedResources(initialized.slice(0, 10));
  }, [resources]);

  const handleSchedulerToggle = (resourceId, currentState, resourceName) => {
    setToggleDialog({
      open: true,
      resourceId,
      newState: !currentState,
      resourceName,
    });
  };

  const handleConfirmToggle = () => {
    const { resourceId, newState } = toggleDialog;
    const updatedResources = pagedResources.map((resource) =>
      resource.resourceId === resourceId
        ? { ...resource, enableScheduler: newState }
        : resource
    );
    setPagedResources(updatedResources);

    setToggleDialog({
      open: false,
      resourceId: null,
      newState: null,
      resourceName: "",
    });
  };

  const handleCancelToggle = () => {
    setToggleDialog({
      open: false,
      resourceId: null,
      newState: null,
      resourceName: "",
    });
  };

  const handlePageChange = (page, rowsPerPage) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPagedResources(resources.slice(start, end));
  };

  return (
    <>
      <Paper
        elevation={2}
        style={{
          padding: "14px 20px",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0, color: "#1976d2" }}>EC2 RESOURCES</h3>
      </Paper>

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {loading ? (
          <FullScreenLoader />
        ) : (
          <DataTable columns={columns} rows={pagedResources} />
        )}

        {!loading && (
          <Pagination
            total={resources.length}
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
          {toggleDialog.newState ? "Enable Scheduler" : "Disable Scheduler"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "16px", color: "#333" }}>
            Are you sure you want to{" "}
            <strong>{toggleDialog.newState ? "enable" : "disable"}</strong> the
            scheduler for <strong>{toggleDialog.resourceName}</strong>?
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
            {toggleDialog.newState ? "Enable" : "Disable"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
