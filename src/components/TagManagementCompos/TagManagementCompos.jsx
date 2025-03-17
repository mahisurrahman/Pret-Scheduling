import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// TagList component to be integrated in the first tab panel
export function TagManagementCompos() {
  const [tags, setTags] = React.useState([
    { name: "allergies", color: "#283593", duration: 15 },
    { name: "test", color: "#7f0000", duration: 30 },
    { name: "Check 1", color: "#ffaaa5", duration: 10 },
    { name: "New Patient", color: "#81deea", duration: 45 },
    { name: "Regular", color: "#4caf50", duration: 20 },
    { name: "old", color: "#ba68c8", duration: 5 },
    { name: "test 10", color: "#7f0000", duration: 30 },
    { name: "limon", color: "#ffaaa5", duration: 25 },
    { name: "Test Checking 2", color: "#81deea", duration: 15 },
  ]);

  // State for the create tag modal
  const [open, setOpen] = React.useState(false);

  // State for the filter menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilter = Boolean(anchorEl);

  // State for the tag action menu (edit/delete)
  const [tagAnchorEl, setTagAnchorEl] = React.useState(null);
  const [selectedTagIndex, setSelectedTagIndex] = React.useState(null);
  const openTagMenu = Boolean(tagAnchorEl);

  // State for edit tag modal
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editingTag, setEditingTag] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleTagMenuClick = (event, index) => {
    setTagAnchorEl(event.currentTarget);
    setSelectedTagIndex(index);
  };

  const handleTagMenuClose = () => {
    setTagAnchorEl(null);
    setSelectedTagIndex(null);
  };

  const handleEditClick = () => {
    setEditingTag({ ...tags[selectedTagIndex], index: selectedTagIndex });
    setEditModalOpen(true);
    handleTagMenuClose();
  };

  const handleDeleteClick = () => {
    const newTags = [...tags];
    newTags.splice(selectedTagIndex, 1);
    setTags(newTags);
    handleTagMenuClose();
  };

  const handleEditSubmit = (updatedTag) => {
    const newTags = [...tags];
    const index = updatedTag.index;
    delete updatedTag.index;
    newTags[index] = updatedTag;
    setTags(newTags);
    setEditModalOpen(false);
    setEditingTag(null);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingTag(null);
  };

  const addNewTag = (newTag) => {
    setTags([...tags, newTag]);
    handleClose();
  };

  const sortTags = (type, direction) => {
    const sortedTags = [...tags];

    if (type === "name") {
      sortedTags.sort((a, b) => {
        if (direction === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else if (type === "duration") {
      sortedTags.sort((a, b) => {
        if (direction === "asc") {
          return a.duration - b.duration;
        } else {
          return b.duration - a.duration;
        }
      });
    }

    setTags(sortedTags);
    handleFilterClose();
  };

  return (
    <Box sx={{ bgcolor: "#1e1e1e", color: "white", minHeight: "400px", p: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <IconButton sx={{ color: "white" }} onClick={handleOpen}>
          <AddIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openFilter}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              bgcolor: "#212121",
              color: "white",
              boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.14)",
              width: "220px",
            },
          }}
        >
          <MenuItem
            onClick={() => sortTags("name", "asc")}
            sx={{ fontSize: "14px" }}
          >
            <ArrowUpwardIcon fontSize="small" sx={{ mr: 1 }} />
            Sort by Name(asc)
          </MenuItem>
          <MenuItem
            onClick={() => sortTags("name", "desc")}
            sx={{ fontSize: "14px" }}
          >
            <ArrowDownwardIcon fontSize="small" sx={{ mr: 1 }} />
            Sort by Name(desc)
          </MenuItem>
          <MenuItem
            onClick={() => sortTags("duration", "asc")}
            sx={{ fontSize: "14px" }}
          >
            <ArrowUpwardIcon fontSize="small" sx={{ mr: 1 }} />
            Sort by Duration(asc)
          </MenuItem>
          <MenuItem
            onClick={() => sortTags("duration", "desc")}
            sx={{ fontSize: "14px" }}
          >
            <ArrowDownwardIcon fontSize="small" sx={{ mr: 1 }} />
            Sort by Duration(desc)
          </MenuItem>
        </Menu>
      </Box>

      {tags.map((tag, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: tag.color,
              borderRadius: "12px",
              px: 2,
              py: 0.5,
              color: "white",
              fontSize: "14px",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            {tag.name}
          </Box>
          <IconButton
            sx={{ color: "white" }}
            onClick={(event) => handleTagMenuClick(event, index)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      ))}

      {/* Tag Actions Menu (Edit/Delete) */}
      <Menu
        anchorEl={tagAnchorEl}
        open={openTagMenu}
        onClose={handleTagMenuClose}
        PaperProps={{
          sx: {
            bgcolor: "#212121",
            color: "white",
            boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.14)",
            width: "150px",
          },
        }}
      >
        <MenuItem onClick={handleEditClick} sx={{ fontSize: "14px" }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          sx={{ fontSize: "14px", color: "#ff5252" }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create Tag Modal */}
      <CreateTagModal open={open} onClose={handleClose} onAdd={addNewTag} />

      {/* Edit Tag Modal */}
      {editingTag && (
        <EditTagModal
          open={editModalOpen}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
          tag={editingTag}
        />
      )}
    </Box>
  );
}

// Modal component for creating new tags
function CreateTagModal({ open, onClose, onAdd }) {
  const [typeName, setTypeName] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState("#ba68c8");

  const colors = [
    "#ba68c8",
    "#4caf50",
    "#ffeb3b",
    "#ffaaa5",
    "#81deea",
    "#ffcc80",
    "#81deea",
    "#7f0000",
    "#1a237e",
    "#ffaaa5",
    "#ffffff",
    "#424242",
    "#9e9e9e",
    "#616161",
  ];

  const handleAdd = () => {
    if (typeName.trim()) {
      onAdd({
        name: typeName,
        color: selectedColor,
        duration,
      });
      setTypeName("");
      setDuration(0);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-tag-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#212121",
          boxShadow: 24,
          p: 2,
          color: "white",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ fontSize: "16px", fontWeight: "bold" }}>Create Type</Box>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5, color: "#90caf9" }}>Type Name *</Box>
          <input
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#424242",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              color: "white",
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5, color: "#90caf9" }}>Default Note Type</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#424242",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              color: "white",
            }}
          >
            <Box>Select</Box>
            <ArrowDropDownIcon />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5, color: "#90caf9" }}>Type Duration in Minute</Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value || 0))}
              style={{
                width: "100%",
                backgroundColor: "#424242",
                border: "1px solid #03a9f4",
                borderRadius: "4px",
                padding: "8px",
                color: "white",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
              <Button sx={{ minWidth: "20px", p: 0, color: "white" }}>▲</Button>
              <Button sx={{ minWidth: "20px", p: 0, color: "white" }}>▼</Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {colors.map((color, index) => (
              <Box
                key={index}
                onClick={() => setSelectedColor(color)}
                sx={{
                  bgcolor: color,
                  borderRadius: "12px",
                  px: 2,
                  py: 0.5,
                  color: color === "#ffffff" ? "black" : "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  border: selectedColor === color ? "2px solid white" : "none",
                }}
              >
                Name
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 1, color: "#90caf9" }}>Custom Color</Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}
            onClick={onClose}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#03a9f4", "&:hover": { bgcolor: "#0288d1" } }}
            onClick={handleAdd}
          >
            ADD
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

// Modal component for editing existing tags
function EditTagModal({ open, onClose, onSubmit, tag }) {
  const [typeName, setTypeName] = React.useState(tag.name);
  const [duration, setDuration] = React.useState(tag.duration);
  const [selectedColor, setSelectedColor] = React.useState(tag.color);

  const colors = [
    "#ba68c8",
    "#4caf50",
    "#ffeb3b",
    "#ffaaa5",
    "#81deea",
    "#ffcc80",
    "#81deea",
    "#7f0000",
    "#1a237e",
    "#ffaaa5",
    "#ffffff",
    "#424242",
    "#9e9e9e",
    "#616161",
  ];

  React.useEffect(() => {
    // Update form when tag changes
    setTypeName(tag.name);
    setDuration(tag.duration);
    setSelectedColor(tag.color);
  }, [tag]);

  const handleSubmit = () => {
    if (typeName.trim()) {
      onSubmit({
        ...tag,
        name: typeName,
        color: selectedColor,
        duration,
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-tag-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#212121",
          boxShadow: 24,
          p: 2,
          color: "white",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ fontSize: "16px", fontWeight: "bold" }}>Edit Type</Box>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5, color: "#90caf9" }}>Type Name *</Box>
          <input
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#424242",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              color: "white",
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5, color: "#90caf9" }}>Default Note Type</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#424242",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              color: "white",
            }}
          >
            <Box>Select</Box>
            <ArrowDropDownIcon />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5, color: "#90caf9" }}>Type Duration in Minute</Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value || 0))}
              style={{
                width: "100%",
                backgroundColor: "#424242",
                border: "1px solid #03a9f4",
                borderRadius: "4px",
                padding: "8px",
                color: "white",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
              <Button sx={{ minWidth: "20px", p: 0, color: "white" }}>▲</Button>
              <Button sx={{ minWidth: "20px", p: 0, color: "white" }}>▼</Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {colors.map((color, index) => (
              <Box
                key={index}
                onClick={() => setSelectedColor(color)}
                sx={{
                  bgcolor: color,
                  borderRadius: "12px",
                  px: 2,
                  py: 0.5,
                  color: color === "#ffffff" ? "black" : "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  border: selectedColor === color ? "2px solid white" : "none",
                }}
              >
                Name
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 1, color: "#90caf9" }}>Custom Color</Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}
            onClick={onClose}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#03a9f4", "&:hover": { bgcolor: "#0288d1" } }}
            onClick={handleSubmit}
          >
            UPDATE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
