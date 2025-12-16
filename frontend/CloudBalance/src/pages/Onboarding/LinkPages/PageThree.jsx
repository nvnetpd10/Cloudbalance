import { Paper, Box, Typography, Link, Checkbox, Radio } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import pageOneImg from "../../../assets/images/pageone.png";
import pagethreeimgone from "../../../assets/images/pagethreeimgone.png";
import pagethreeimgtwo from "../../../assets/images/pagethreeimgtwo.png";
import pagethreeimgthree from "../../../assets/images/pagethreeimgthree.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StepNumber = ({ number }) => (
  <Box
    sx={{
      width: 30,
      height: 30,
      minWidth: 30,
      minHeight: 30,
      borderRadius: "50%",
      backgroundColor: (theme) => theme.palette.primary.main,
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: 600,
    }}
  >
    {number}
  </Box>
);

export default function CreateCostUsageReport() {
  const [copiedRole, setCopiedRole] = useState(false);
  const navigate = useNavigate();

  const handleCopyRole = async () => {
    await navigator.clipboard.writeText("ck-tuner-275595855473-hourly-cur");
    setCopiedRole(true);
    setTimeout(() => setCopiedRole(false), 1500);
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText("275595855473");
    setCopiedRole(true);
    setTimeout(() => setCopiedRole(false), 1500);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600} mt={1}>
          Create Cost & Usage Report{" "}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            mb: 1,
            display: "inline-block",
            borderRadius: "20px",
            fontSize: "14px",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Create a Cost & Usage Report by following these steps{" "}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={1} />
          <Typography>
            Go to
            <Link href="#" underline="hover">
              {" "}
              Cost and Usage Reports{" "}
            </Link>
            in the Billing Dashboard and click on
            <strong> Create report.</strong>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
          <StepNumber number={2} />
          <Typography>
            Name the report as shown below and select the
            <strong> Include resource IDs </strong>checkbox -
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.5,
            mb: 2,
            ml: 4,
            backgroundColor: (theme) => theme.palette.grey[50],
            border: "1px solid",
            borderColor: (theme) => theme.palette.grey[300],
            borderRadius: "4px",
            maxWidth: "400px",
          }}
        >
          <Typography sx={{ fontFamily: "monospace" }}>
            ck-tuner-275595855473-hourly-cur{" "}
          </Typography>

          <Tooltip title={copiedRole ? "Copied!" : "Copy"}>
            <IconButton
              onClick={handleCopyRole}
              size="small"
              sx={{
                ml: "auto",
                color: (theme) => theme.palette.primary.main,
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography sx={{ mb: 1, fontSize: "14px" }}>
            Ensure that the following configuration is checked
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Checkbox
              checked
              sx={{
                color: (theme) => theme.palette.grey[400],
                "&.Mui-checked": {
                  color: (theme) => theme.palette.grey[400],
                },
              }}
            />

            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Include Resource IDs
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "14px", mb: "1rem" }}>
            Click on <strong>Next</strong>
          </Typography>
        </Box>

        <Box
          component="img"
          src={pagethreeimgone}
          alt="IAM Role Summary"
          sx={{
            width: "200%",
            maxWidth: "85rem",
            height: "auto",
            mb: 2,
            ml: 2,
            border: "1px solid",
            borderColor: (theme) => theme.palette.grey[300],
            borderRadius: "4px",
          }}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
          <StepNumber number={3} />
          <Typography>
            In Configure S3 Bucket, provide the name of the S3 bucket that was
            created --
          </Typography>
        </Box>

        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography sx={{ mb: 1, fontSize: "14px" }}>
            Ensure that the following configuration is checked
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Checkbox
              checked
              sx={{
                color: (theme) => theme.palette.grey[400],
                "&.Mui-checked": {
                  color: (theme) => theme.palette.grey[400],
                },
              }}
            />

            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              The following default policy will be applied to your bucket{" "}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "14px", mb: "1rem" }}>
            Click on <strong>Save</strong>
          </Typography>
        </Box>

        <Box
          component="img"
          src={pagethreeimgtwo}
          alt="IAM Role Summary"
          sx={{
            width: "200%",
            maxWidth: "85rem",
            height: "auto",
            mb: 2,
            ml: 2,
            border: "1px solid",
            borderColor: (theme) => theme.palette.grey[300],
            borderRadius: "4px",
          }}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
          <StepNumber number={4} />
          <Typography>
            In the Delivery options section, enter the below-mentioned Report
            path prefix -
          </Typography>
        </Box>

        <Typography sx={{ ml: "2rem", fontSize: "0.7rem" }}>
          Report path prefix:
        </Typography>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.5,
            mb: 2,
            ml: 4,
            backgroundColor: (theme) => theme.palette.grey[50],
            border: "1px solid",
            borderColor: (theme) => theme.palette.grey[300],
            borderRadius: "4px",
            maxWidth: "400px",
          }}
        >
          <Typography sx={{ fontFamily: "monospace" }}>
            275595855473{" "}
          </Typography>

          <Tooltip title={copiedRole ? "Copied!" : "Copy"}>
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{
                ml: "auto",
                color: (theme) => theme.palette.primary.main,
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography sx={{ mb: 1, fontSize: "12px" }}>
            Additionally, ensure that the following checks are in place
          </Typography>
          <Typography sx={{ mb: 1, fontSize: "12px" }}>
            Time granularity:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", mt: "-0.8rem" }}>
            <Radio
              checked
              sx={{
                color: (theme) => theme.palette.grey[400],
                "&.Mui-checked": {
                  color: (theme) => theme.palette.grey[400],
                },
              }}
            />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 500, pt: "0.7rem" }}
            >
              {" "}
              Hourly
            </Typography>
          </Box>

          <Typography sx={{ mb: 1, fontSize: "12px" }}>
            Please make sure these checks are Enabled in Enable report data
            integration for:
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Checkbox
              checked
              sx={{
                color: (theme) => theme.palette.grey[400],
                "&.Mui-checked": {
                  color: (theme) => theme.palette.grey[400],
                },
              }}
            />

            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {" "}
              Amazom Athena
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          src={pagethreeimgthree}
          alt="IAM Role Summary"
          sx={{
            width: "200%",
            maxWidth: "85rem",
            height: "auto",
            mb: 2,
            ml: 2,
            border: "1px solid",
            borderColor: (theme) => theme.palette.grey[300],
            borderRadius: "4px",
          }}
        />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={5} />
          <Typography>
            Click on <strong>Next</strong>. Now, review the configuration of the
            Cost and Usage Report. Once satisfied, click on{" "}
            <strong>Create Report.</strong>
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          pt: 1,
        }}
      >
        <Box
          component="button"
          onClick={() => navigate("/dashboard/onboarding")}
          sx={{
            px: 3,
            py: 1,
            fontSize: "14px",
            fontWeight: 500,
            color: (theme) => theme.palette.primary.main,
            backgroundColor: "white",
            border: "1px solid",
            borderColor: (theme) => theme.palette.primary.main,
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.1s",
          }}
        >
          Cancel
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            component="button"
            onClick={() =>
              navigate("/dashboard/onboarding/customer-managed-policies")
            }
            sx={{
              px: 3,
              py: 1,
              fontSize: "14px",
              fontWeight: 500,
              color: (theme) => theme.palette.primary.main,
              backgroundColor: "white",
              border: "1px solid",
              borderColor: (theme) => theme.palette.primary.main,
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.1s",
            }}
          >
            Back
          </Box>

          <Box
            component="button"
            onClick={() => navigate("/dashboard/onboarding")}
            sx={{
              px: 3,
              py: 1,
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
              backgroundColor: (theme) => theme.palette.primary.main,
              border: "1px solid",
              borderColor: (theme) => theme.palette.primary.main,
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.1s",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Submit
          </Box>
        </Box>
      </Box>
    </>
  );
}
