import * as React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export const AllStatusesCompo = () => {
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  // Sample status data
  const statuses = [
    { name: "Confirmed", color: "#90caf9" },
    { name: "Arrived", color: "#ce93d8" },
    { name: "Being Seen", color: "#ffb74d" },
    { name: "Left", color: "#81c784" },
    { name: "Cancel", color: "#f44336" },
    { name: "No Show", color: "#9e9e9e" },
  ];

  // Sample color options for new status
  const colorOptions = [
    "#ce93d8",
    "#81c784",
    "#fff176",
    "#ef9a9a",
    "#90caf9",
    "#ffcc80",
    "#80deea",
    "#aa2e25",
    "#1a237e",
    "#f44336",
    "#ffffff",
    "#000000",
    "#9e9e9e",
    "#757575",
  ];

  const handleAddClick = () => {
    setShowCreateForm(true);
  };

  const handleCancelClick = () => {
    setShowCreateForm(false);
  };

  const handleAddStatus = () => {
    // Logic to add a new status would go here
    setShowCreateForm(false);
  };

  if (showCreateForm) {
    return (
      <Box sx={{ color: "white", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Create Status</Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCancelClick} />
        </Box>

        <Typography sx={{ mb: 1, color: "#aaa" }}>Status Name *</Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#666" },
              "&.Mui-focused fieldset": { borderColor: "#eeff41" },
              input: { color: "white" },
            },
          }}
        />

        <Typography sx={{ mb: 1, color: "#aaa" }}>Status Short Name</Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#666" },
              "&.Mui-focused fieldset": { borderColor: "#eeff41" },
              input: { color: "white" },
            },
          }}
        />

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {colorOptions.map((color, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                sx={{
                  bgcolor: color,
                  color:
                    color === "#ffffff" ||
                    color === "#fff176" ||
                    color === "#81c784"
                      ? "#000"
                      : "#fff",
                  minWidth: "auto",
                  borderRadius: 1,
                  padding: "2px 8px",
                  "&:hover": { bgcolor: color, opacity: 0.8 },
                }}
              >
                Name
              </Button>
            ))}
          </Box>

          {/* <Typography sx={{ color: "#3ea8ff", mb: 1 }}>Custom Color</Typography> */}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleCancelClick}
            sx={{
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleAddStatus}
            sx={{
              bgcolor: "#90caf9",
              color: "#000",
              "&:hover": { bgcolor: "#64b5f6" },
            }}
          >
            ADD
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ color: "white", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={handleAddClick}
          sx={{
            minWidth: "30px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            p: 0,
            bgcolor: "#444",
            "&:hover": { bgcolor: "#666" },
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {statuses.map((status, index) => (
          <Button
            key={index}
            variant="contained"
            size="small"
            sx={{
              bgcolor: status.color,
              color: ["#fff176", "#81c784", "#90caf9", "#ffffff"].includes(
                status.color
              )
                ? "#000"
                : "#fff",
              justifyContent: "flex-start",
              textTransform: "none",
              borderRadius: "10px",
              p: "4px 12px",
              width: "fit-content", // Ensures button width adjusts to content
              minWidth: "auto", // Prevents unnecessary minimum width
              "&:hover": { bgcolor: status.color, opacity: 0.9 },
            }}
          >
            {status.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
