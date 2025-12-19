import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import EC2Table from "./Tables/EC2Table";
import RDSTable from "./Tables/RDSTable";
import AGSTable from "./Tables/AGSTable";

const AwsDashboard = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Box sx={{ width: "fit-content", borderRadius: "8px", padding: "4px" }}>
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="standard"
        >
          <Tab label="EC2" sx={{ minWidth: 100 }} />
          <Tab label="RDS" sx={{ minWidth: 100 }} />
          <Tab label="AGS" sx={{ minWidth: 100 }} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {value === 0 && <EC2Table />}
        {value === 1 && <RDSTable />}
        {value === 2 && <AGSTable />}
      </Box>
    </Box>
  );
};

export default AwsDashboard;
