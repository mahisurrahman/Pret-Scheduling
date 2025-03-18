/* eslint-disable no-unused-vars */
import * as React from "react";
import { Box, Button, Checkbox, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const AllCheckpointsManagementCompo = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = React.useState(null);
  
  // Sample checkpoints data
  const checkpoints = [
    { id: 1, name: "unsigned", color: "#e91e63" },
    { id: 2, name: "signed", color: "#90caf9" },
    { id: 3, name: "faxed", color: "#78909c" },
    { id: 4, name: "billed", color: "#4caf50" }
  ];
  
  // Sample icon options
  const iconOptions = [
    { id: 1, color: "#ce93d8" }, // Purple
    { id: 2, color: "#4caf50" }, // Green
    { id: 3, color: "#fff176" }, // Yellow
    { id: 4, color: "#ef9a9a" }, // Pink
    { id: 5, color: "#90caf9" }, // Light Blue
    { id: 6, color: "#ffb74d" }, // Orange
    { id: 7, color: "#80deea" }, // Teal
    { id: 8, color: "#d32f2f" }, // Red
    { id: 9, color: "#3f51b5" }, // Indigo
    { id: 10, color: "#f44336" }, // Red
    { id: 11, color: "#ffffff" }, // White
    { id: 12, color: "#000000" }, // Black
    { id: 13, color: "#9c27b0" }, // Purple
    { id: 14, color: "#4caf50" }, // Green
    { id: 15, color: "#9e9e9e" }, // Grey
    { id: 16, color: "#4caf50" }, // Green
  ];

  const handleMenuOpen = (event, checkpoint) => {
    setAnchorEl(event.currentTarget);
    setSelectedCheckpoint(checkpoint);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCheckpoint(null);
  };

  const handleIconSelect = (icon) => {
    // Logic to assign icon to checkpoint would go here
    handleMenuClose();
  };

  return (
    <Box sx={{ color: "white", p: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {checkpoints.map((checkpoint) => (
          <Box 
            key={checkpoint.id} 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              pr: 1
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox 
                defaultChecked
                sx={{ 
                  color: "#666",
                  '&.Mui-checked': {
                    color: "#fff",
                  },
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: checkpoint.color,
                  color: ["#fff176", "#4caf50", "#90caf9"].includes(checkpoint.color) ? "#000" : "#fff",
                  textTransform: "none",
                  borderRadius: "16px",
                  p: "4px 12px",
                  "&:hover": { bgcolor: checkpoint.color, opacity: 0.9 }
                }}
              >
                {checkpoint.name}
              </Button>
            </Box>
            <IconButton 
              size="small"
              onClick={(e) => handleMenuOpen(e, checkpoint)}
              sx={{ color: "#fff" }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            bgcolor: "#333",
            width: 180,
            padding: 1,
            borderRadius: 1,
          }
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
          {iconOptions.map((icon) => (
            <Button
              key={icon.id}
              onClick={() => handleIconSelect(icon)}
              sx={{
                minWidth: 32,
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: icon.color,
                p: 0,
                "&:hover": { bgcolor: icon.color, opacity: 0.8 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: ["#fff176", "#4caf50", "#90caf9", "#ffffff"].includes(icon.color) ? "#000" : "#fff", fontSize: "1rem" }}>
                f
              </Typography>
            </Button>
          ))}
          {/* <Button
            sx={{
              minWidth: 32,
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "#555",
              p: 0,
              "&:hover": { bgcolor: "#777" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: "1.2rem" }}>
              +
            </Typography>
          </Button> */}
        </Box>
      </Menu>
    </Box>
  );
};