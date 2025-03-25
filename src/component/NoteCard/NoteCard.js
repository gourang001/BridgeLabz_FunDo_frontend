import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Popover,
  Modal,
  Button,
  Tooltip, 
} from "@mui/material";
import {
  NotificationsNoneOutlined,
  PersonAddOutlined,
  PaletteOutlined,
  ImageOutlined,
  ArchiveOutlined,
  UnarchiveOutlined,
  DeleteOutlined,
  RestoreFromTrashOutlined,
  MoreVertOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import {
  archiveNotesApiCall,
  trashNotesApiCall,
  restoreNotesApiCall,
  deleteNoteForeverApiCall,
  changeColorAPI,
  setReminderApiCall,
  removeReminderApiCall,
} from "../../utils/Api";
import AddNote from "../AddNote/AddNote";
import ColorPalette from "../ColorPalette/ColorPalette";

export default function NoteCard({ noteDetails, updateList, isTrash = false }) {
  const [hover, setHover] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [reminderAnchor, setReminderAnchor] = useState(null);
  const [reminder, setReminder] = useState(noteDetails?.reminder || null);
  const [tempReminder, setTempReminder] = useState("");

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleIconClick = ({ action, data }) => {
    if (action === "update") {
      updateList({ action: "update", data });
    } else if (action === "color") {
      setShowColors(false);
      changeColorAPI({ noteIdList: [`${noteDetails.id}`], color: data })
        .then(() =>
          updateList({ action: "color", data: { ...noteDetails, color: data } })
        )
        .catch((err) => console.error("Error changing color:", err));
    }
  };

  const handleArchiveToggle = () => {
    const newArchiveStatus = !noteDetails.isArchived;
    archiveNotesApiCall({
      noteIdList: [noteDetails.id],
      isArchived: newArchiveStatus,
    })
      .then((response) => {
        const updatedNote = { ...noteDetails, isArchived: newArchiveStatus };
        updateList({
          data: updatedNote,
          action: newArchiveStatus ? "archive" : "unarchive",
        });
      })
      .catch((err) => console.error("Error updating archive status:", err));
  };

  const handleMoveToTrash = () => {
    trashNotesApiCall({ noteIdList: [noteDetails.id], isDeleted: true })
      .then((response) => {
        const updatedNote = { ...noteDetails, isDeleted: true };
        updateList({ data: updatedNote, action: "delete" });
      })
      .catch((err) => console.error("Error moving note to trash:", err));
    handleMenuClose();
  };

  const handleRestore = () => {
    restoreNotesApiCall({ noteIdList: [noteDetails.id], isDeleted: false })
      .then((response) => {
        const updatedNote = { ...noteDetails, isDeleted: false };
        updateList({ data: updatedNote, action: "restore" });
      })
      .catch((err) => console.error("Error restoring note:", err));
  };

  const handleDeleteForever = () => {
    deleteNoteForeverApiCall({ noteIdList: [noteDetails.id] })
      .then(() => {
        updateList({ data: noteDetails, action: "delete" });
      })
      .catch((err) => console.error("Error deleting note permanently:", err));
  };

  const handleColorChange = ({ noteId, color }) => {
    handleIconClick({ action: "color", data: color });
  };

  const handleReminderOpen = (event) => {
    setReminderAnchor(event.currentTarget);
    if (reminder && !isNaN(new Date(reminder).getTime())) {
      setTempReminder(new Date(reminder).toISOString().slice(0, 16));
    } else {
      setTempReminder("");
    }
  };

  const handleReminderClose = () => {
    setReminderAnchor(null);
    setTempReminder("");
  };

  const handleChange = (e) => {
    const localDateTime = e.target.value;
    const isoFormat = new Date(localDateTime).toISOString();
    setTempReminder(isoFormat);
  };

  const handleSubmit = () => {
    const payload = {
      noteIdList: [noteDetails?.id],
      reminder: tempReminder,
    };
    setReminderApiCall(payload)
      .then((response) => {
        setReminder(tempReminder);
        updateList({
          action: "update",
          data: { ...noteDetails, reminder: tempReminder },
        });
        handleReminderClose();
      })
      .catch((err) => console.log(err.message));
  };

  const handleDeleteReminder = () => {
    const payload = {
      noteIdList: [noteDetails?.id],
    };
    removeReminderApiCall(payload)
      .then((response) => {
        setReminder(null);
        updateList({
          action: "update",
          data: { ...noteDetails, reminder: null },
        });
      })
      .catch((err) => console.error("Error removing reminder:", err));
  };

  return (
    <Card
      sx={{
        width: 200,
        minHeight: 155,
        padding: 1,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #ccc",
        transition: "box-shadow 0.3s ease-in-out",
        position: "relative",
        margin: "10px",
        backgroundColor: noteDetails?.color || "#FFFFFF",
        "&:hover": { boxShadow: 6 },
        overflow: "hidden",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardContent onClick={() => !isTrash && setModalOpen(true)}>
        <Typography variant="body1" fontWeight="bold">
          {noteDetails?.title || "Untitled"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {noteDetails?.description || "No description available"}
        </Typography>
        {reminder && !isNaN(new Date(reminder).getTime()) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "grey",
              mt: 1,
              p: 1,
              border: "1px solid",
              borderColor: "grey",
              borderRadius: 4,
              backgroundColor: "background.paper",
              transition: "border-color 0.3s ease",
              "&:hover": { borderColor: "grey" },
            }}
          >
            <Typography variant="caption" color="textSecondary" sx={{ flexGrow: 1 }}>
              {new Date(reminder).toLocaleString()}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteReminder();
              }}
              aria-label="Remove reminder"
              sx={{ ml: 1, color: "grey.500", "&:hover": { color: "grey.800" } }}
            >
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>

      {hover && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8px 8px",
          }}
        >
          {isTrash ? (
            <>
              <Tooltip title="Restore from Trash" arrow>
                <IconButton size="small" onClick={handleRestore}>
                  <RestoreFromTrashOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Forever" arrow>
                <IconButton size="small" onClick={handleDeleteForever}>
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Set Reminder" arrow>
                <IconButton size="small" onClick={handleReminderOpen}>
                  <NotificationsNoneOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Collaborator" arrow>
                <IconButton size="small">
                  <PersonAddOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Change Color" arrow>
                <IconButton size="small" onClick={() => setShowColors(!showColors)}>
                  <PaletteOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Image" arrow>
                <IconButton size="small">
                  <ImageOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={noteDetails.isArchived ? "Unarchive" : "Archive"}
                arrow
              >
                <IconButton size="small" onClick={handleArchiveToggle}>
                  {noteDetails.isArchived ? (
                    <UnarchiveOutlined fontSize="small" />
                  ) : (
                    <ArchiveOutlined fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="More Options" arrow>
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVertOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      )}

      {showColors && !isTrash && (
        <div
          style={{
            position: "absolute",
            top: "2%",
            left: "18%",
            transform: "translate(-50%, -50%)",
            zIndex: 7,
          }}
        >
          <ColorPalette
            onColorSelect={handleColorChange}
            noteId={noteDetails.id}
          />
        </div>
      )}

      <Popover
        open={Boolean(reminderAnchor)}
        anchorEl={reminderAnchor}
        onClose={handleReminderClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box sx={{ p: 2, minWidth: 250, position: "relative" }}>
          <IconButton
            size="small"
            onClick={handleReminderClose}
            aria-label="Close reminder popup"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
              "&:hover": { color: "grey.800" },
            }}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>

          <input
            type="datetime-local"
            value={tempReminder}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleReminderClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={
                !tempReminder || isNaN(new Date(tempReminder).getTime())
              }
            >
              Save
            </Button>
          </Box>
        </Box>
      </Popover>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMoveToTrash}>Delete note</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add drawing</MenuItem>
        <MenuItem onClick={handleMenuClose}>Make a copy</MenuItem>
        <MenuItem onClick={handleMenuClose}>Show checkboxes</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy to Google Docs</MenuItem>
        <MenuItem onClick={handleMenuClose}>Version history</MenuItem>
      </Menu>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <AddNote
            updateList={updateList}
            noteDetails={noteDetails}
            setModalOpen={setModalOpen}
            handleIconClick={handleIconClick}
          />
        </Box>
      </Modal>
    </Card>
  );
}
