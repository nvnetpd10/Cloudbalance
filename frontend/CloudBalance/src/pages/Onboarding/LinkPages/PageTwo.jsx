import { Paper, Box, Typography, Link } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import pageOneImg from "../../../assets/images/pageone.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pagetwoimgone from "../../../assets/images/pagetwoimgone.png";
import pagetwoimgtwo from "../../../assets/images/pagetwoimgtwo.png";
import { useLocation } from "react-router-dom";

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

export default function AddCustomerManagedPolicies() {
  const [copied, setCopied] = useState(false);
  const [copiedRole, setCopiedRole] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  useEffect(() => {
    if (!formData) {
      navigate("/dashboard/onboarding", { replace: true });
    }
  }, [formData, navigate]);

  const iamPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SpottingPutEvents",
      "Effect": "Allow",
      "Action": [
        "events:PutEvents"
      ],
      "Resource": "arn:aws:events:us-east-1:275595855473:event-bus/cktuner-central-event-bus-dev2"
    },
    {
      "Sid": "SpottingEvents",
      "Action": [
        "events:PutRule",
        "events:PutTargets",
        "events:DeleteRule",
        "events:RemoveTargets",
        "events:DisableRule",
        "events:EnableRule",
        "events:TagResource",
        "events:UntagResource",
        "events:DescribeRule",
        "events:ListTargetsByRule",
        "events:ListTagsForResource"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:events:*:*:rule/cktuner-*"
    },
    {
      "Sid": "AllowUpdateService",
      "Effect": "Allow",
      "Action": [
        "ecs:UpdateService"
      ],
      "Resource": "*"
    },
    {
      "Sid": "PassRoleToEventBridge",
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::*:role/CK-Tuner-Role-dev2",
      "Condition": {
        "StringEquals": {
          "iam:PassedToService": [
            "events.amazonaws.com"
          ]
        }
      }
    }
  ]
}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(iamPolicy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCopyRole = async () => {
    await navigator.clipboard.writeText("cktuner-SpottingEvents");
    setCopiedRole(true);
    setTimeout(() => setCopiedRole(false), 1500);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600} mt={1}>
          Add Customer Managed Policies{" "}
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
          Create an Inline policy for the role by following these steps{" "}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={1} />
          <Typography>
            Go to the &nbsp;
            <Link href="#" underline="hover">
              Create Policy{"  "}
            </Link>
            Page
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={2} />
          <Typography>
            Click on the <strong> JSON </strong>tab and paste the following
            policy and click on Next:
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
            In the <strong>Name</strong> field, enter below-mentioned policy
            name and click on Create Policy
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
            cktuner-SpottingEvents
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
          <StepNumber number={4} />
          <Typography>
            Go to the <strong>CK-Tuner-Role </strong>{" "}
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

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <StepNumber number={5} />
          <Typography>
            In Permission policies,{" "}
            <strong>click on Add permissions {">"} Attach Policy</strong>{" "}
          </Typography>
        </Box>

        <Box
          component="img"
          src={pagetwoimgone}
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
          <StepNumber number={6} />
          <Typography>
            Filter by Type {">"} Customer managed then search for{" "}
            <strong>
              cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
              cktuner-TunerReadEssentials , cktuner-SpottingEvents
            </strong>{" "}
            and select them.
          </Typography>
        </Box>

        <Box
          component="img"
          src={pagetwoimgtwo}
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
          <StepNumber number={7} />
          <Typography>
            Now, click on <strong>Add permissions</strong>{" "}
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
            onClick={() => navigate("/dashboard/onboarding/create-iam-role")}
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
              navigate("/dashboard/onboarding/create-cost", {
                state: formData,
              })
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
            Next - Create Cost & Usage Report
          </Box>
        </Box>
      </Box>
    </>
  );
}
