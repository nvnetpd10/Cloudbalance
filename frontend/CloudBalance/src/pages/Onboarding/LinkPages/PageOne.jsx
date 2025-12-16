import { Paper, Box, Typography, Link } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import pageOneImg from "../../../assets/images/pageone.png";
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

export default function CreateIamRole() {
  const [copied, setCopied] = useState(false);
  const [copiedRole, setCopiedRole] = useState(false);
  const navigate = useNavigate();

  const iamPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "s3.amazonaws.com",
          "events.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(iamPolicy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCopyRole = async () => {
    await navigator.clipboard.writeText("CK-Tuner-Role-dev2");
    setCopiedRole(true);
    setTimeout(() => setCopiedRole(false), 1500);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600} mt={1}>
          Create an IAM Role
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
          Create an IAM Role by following these steps
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={1} />
          <Typography>
            Log into AWS account &nbsp;
            <Link href="#" underline="hover">
              Create an IAM Role
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={2} />
          <Typography>
            In the Trusted entity type section, select{" "}
            <strong>Custom trust policy</strong>. Replace the policy with the
            one below.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            maxHeight: "260px",
            overflowY: "auto",
            backgroundColor: (theme) => theme.palette.grey[50],
            borderRadius: "6px",
            p: 2,
            mb: 2,
            border: "1px solid transparent",
            transition: "border 0.2s ease",
            "&:hover": {
              borderColor: (theme) => theme.palette.primary.main,
            },
            scrollbarWidth: "thin",
            scrollbarColor: (theme) =>
              `${theme.palette.primary.main} ${theme.palette.grey[200]}`,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: (theme) => theme.palette.grey[200],
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: "10px",
            },
          }}
        >
          <Tooltip title={copied ? "Copied!" : "Copy"}>
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{
                position: "absolute",
                top: 6,
                right: 6,
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

          <Box
            component="pre"
            sx={{
              m: 0,
              fontSize: "13px",
              whiteSpace: "pre",
              color: (theme) => theme.palette.primary.main,
              fontFamily: "monospace",
            }}
          >
            {iamPolicy}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
          <StepNumber number={3} />
          <Typography>
            Click on <strong>Next</strong> to go to the permissions page. We
            would not be adding any permissions for now because the permission
            policy content will be dependent on the AWS Account ID retrieved
            from the IAM Role. Click on Next.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
          <StepNumber number={4} />
          <Typography>
            In the Role name field, enter the below-mentioned role name, and
            click on
            <strong> Create Role - </strong>
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
            CK-Tuner-Role-dev2
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

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={5} />
          <Typography>
            Go to the newly create IAM Role and copy the Role ARN
          </Typography>
        </Box>

        <Box
          component="img"
          src={pageOneImg}
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

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <StepNumber number={6} />
          <Typography>Paste the copied Role ARN below</Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 4,
            ml: 4,
            mb: 3,
          }}
        >
          <Box>
            <Typography sx={{ mb: 1, fontSize: "14px" }}>
              Enter the IAM Role ARN <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box
              component="input"
              placeholder="Enter the IAM Role ARN"
              sx={{
                width: "82%",
                p: 1.5,
                fontSize: "14px",
                border: "1px solid",
                borderColor: (theme) => theme.palette.grey[300],
                borderRadius: "4px",
                "&:focus": {
                  outline: "none",
                  borderColor: (theme) => theme.palette.primary.main,
                },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontSize: "14px" }}>
              Enter Account ID <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box
              component="input"
              placeholder="Enter Account ID"
              sx={{
                width: "82%",
                p: 1.5,
                fontSize: "14px",
                border: "1px solid",
                borderColor: (theme) => theme.palette.grey[300],
                borderRadius: "4px",
                "&:focus": {
                  outline: "none",
                  borderColor: (theme) => theme.palette.primary.main,
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ ml: 4, mb: 3 }}>
          <Typography sx={{ mb: 1, fontSize: "14px" }}>
            Enter Account Name <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box
            component="input"
            placeholder="Enter Account Name"
            sx={{
              width: "40%",
              maxWidth: "100%",
              p: 1.5,
              fontSize: "14px",
              border: "1px solid",
              borderColor: (theme) => theme.palette.grey[300],
              borderRadius: "4px",
              "&:focus": {
                outline: "none",
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
          />
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
            Back
          </Box>

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
            Next - Add Customer Managed Policies
          </Box>
        </Box>
      </Box>
    </>
  );
}
