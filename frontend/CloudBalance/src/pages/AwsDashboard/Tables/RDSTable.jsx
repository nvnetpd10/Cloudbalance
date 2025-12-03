import { useState, useEffect } from "react";
import { Paper, Box, Chip } from "@mui/material";
import useAwsRDS from "../../../components/hooks/useAwsRDS";
import DataTable from "../../../components/common/DataTable";
import Pagination from "../../../components/common/DataPagination";
import FullScreenLoader from "../../../components/common/FullScreenLoader";

export default function RDSTable() {
  const { resources, loading } = useAwsRDS();
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
    { name: "Engine", field: "engine", key: "engine", sortable: true },
    { name: "Region", field: "region", key: "region", sortable: true },
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
            backgroundColor:
              row.status === "available" || row.status === "running"
                ? "#4caf50"
                : "red",
            color: "#fff",
            fontWeight: 600,
            fontSize: "12px",
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    setPagedResources(resources.slice(0, 10));
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
        <h3 style={{ margin: 0, color: "#1976d2" }}>RDS RESOURCES</h3>
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
