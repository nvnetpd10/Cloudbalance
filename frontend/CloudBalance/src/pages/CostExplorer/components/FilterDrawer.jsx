import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FILTERS, FILTER_VALUES } from "./constants";

export default function FilterDrawer({
  open,
  onClose,
  selectedFilters,
  setSelectedFilters,
  expandedFilter,
  setExpandedFilter,
  selectedFilterValues,
  setSelectedFilterValues,
}) {
  const toggleExpand = (label) => {
    setExpandedFilter((prev) => (prev === label ? null : label));
  };

  const toggleFilter = (label) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleFilterValue = (label, value) => {
    setSelectedFilterValues((prev) => ({
      ...prev,
      [label]: {
        ...(prev[label] || {}),
        [value]: !prev[label]?.[value],
      },
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setSelectedFilterValues({});
    setExpandedFilter(null);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: open ? 0 : "-100%",
        width: 320,
        height: "100%",
        bgcolor: "background.paper",
        borderLeft: "1px solid",
        borderColor: "divider",
        p: 2,
        transition: "right 0.25s ease",
        zIndex: 10,
        pointerEvents: open ? "auto" : "none",
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography fontWeight={600}>Filters</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            size="small"
            variant="text"
            onClick={resetFilters}
            sx={{ fontSize: 12 }}
          >
            Reset All
          </Button>
          <Button size="small" variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 1 }} />

      <Stack spacing={0}>
        {FILTERS.map((label) => (
          <Box key={label}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                py: 0.75,
                px: 0.5,
                cursor: "pointer",
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:hover": { bgcolor: "action.hover" },
              }}
              onClick={() => toggleExpand(label)}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <input
                  type="checkbox"
                  checked={!!selectedFilters[label]}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleFilter(label);
                  }}
                />
                <Typography fontSize={13}>{label}</Typography>
              </Stack>

              <Typography fontSize={11} color="text.secondary">
                Include Only
              </Typography>
            </Stack>

            {expandedFilter === label && FILTER_VALUES[label] && (
              <Box sx={{ pl: 3, pr: 1, py: 1, bgcolor: "grey.50" }}>
                <Typography fontSize={11} color="text.secondary" mb={0.5}>
                  No filters currently added.
                </Typography>

                <TextField
                  size="small"
                  placeholder="Search"
                  fullWidth
                  sx={{ mb: 1 }}
                />

                <Typography fontSize={11} color="text.secondary" mb={0.5}>
                  Showing {FILTER_VALUES[label].length} results
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                  <Checkbox
                    size="small"
                    checked={FILTER_VALUES[label].every(
                      (v) => selectedFilterValues[label]?.[v]
                    )}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedFilterValues((prev) => ({
                        ...prev,
                        [label]: Object.fromEntries(
                          FILTER_VALUES[label].map((v) => [v, checked])
                        ),
                      }));
                    }}
                  />
                  <Typography fontSize={12}>Select All</Typography>
                </Stack>

                <Box sx={{ maxHeight: 180, overflowY: "auto", mb: 1 }}>
                  {FILTER_VALUES[label].map((value) => (
                    <Stack
                      key={value}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ py: 0.25 }}
                    >
                      <Checkbox
                        size="small"
                        checked={!!selectedFilterValues[label]?.[value]}
                        onChange={() => toggleFilterValue(label, value)}
                      />
                      <Typography fontSize={12}>{value}</Typography>
                    </Stack>
                  ))}
                </Box>

                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setExpandedFilter(null)}
                  >
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setExpandedFilter(null)}
                  >
                    Apply
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
