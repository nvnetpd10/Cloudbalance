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

import useAwsAGS from "../../../components/hooks/AWS/useAwsAGS";
import DataTable from "../../../components/common/DataTable";
import Pagination from "../../../components/common/DataPagination";
import FullScreenLoader from "../../../components/common/FullScreenLoader";

export default function RGSTable() {
  const { resources, loading } = useAwsAGS();
  const [pagedResources, setPagedResources] = useState([]);

  const columns = [
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
      name: "Desired Capacity",
      field: "desiredCapacity",
      key: "desiredCapacity",
      sortable: true,
      formatter: (row) => String(row.desiredCapacity ?? "N/A"),
    },
    {
      name: "Min Size",
      field: "minSize",
      key: "minSize",
      sortable: true,
      formatter: (row) => String(row.minSize ?? "N/A"),
    },
    {
      name: "Max Size",
      field: "maxSize",
      key: "maxSize",
      sortable: true,
      formatter: (row) => String(row.maxSize ?? "N/A"),
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
            backgroundColor: row.status === "active" ? "#4caf50" : "red",
            color: "#fff",
            fontWeight: 600,
            fontSize: "12px",
          }}
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
        <h3 style={{ margin: 0, color: "#1976d2" }}>AGS RESOURCES</h3>
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
    </>
  );
}
