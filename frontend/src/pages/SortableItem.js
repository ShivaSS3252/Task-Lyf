import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconButton,
  Popper,
  Paper,
  MenuList,
  MenuItem as MuiMenuItem,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "../contexts/ThemeContext";
export const SortableItem = ({ id, content, openEditModal, handleDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [anchorEl, setAnchorEl] = useState(null); // Track anchorEl state uniquely for each item
  const { darkMode } = useTheme();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition:
      transition || "transform 250ms ease-in-out, box-shadow 250ms ease-in-out",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: isDragging
      ? "0px 8px 16px rgba(0, 0, 0, 0.2)"
      : "0px 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.9 : 1,
    position: "relative", // Ensure proper positioning for Popper
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the clicked item as the anchor
  };

  const handleClickAway = () => {
    setAnchorEl(null); // Close the Popper
  };

  const isPopperOpen = Boolean(anchorEl); // Check if the Popper is open

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Prevent drag action when clicking the icon button
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent drag from happening on button click
    handleMenuClick(event); // Trigger popper open
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // Apply drag functionality to the whole div
    >
      {/* Content Area */}
      <div {...listeners} style={{ padding: "10px" }}>
        <div
          style={{
            fontWeight: "bold",
            backgroundColor: "#121212",
            color: "#ffffff",
            padding: "5px",
            borderRadius: "5px",
            display: "inline-block",
            fontSize: "12px",
            marginBottom: "5px",
            textTransform: "uppercase",
          }}
        >
          {content.priority}
        </div>
        <div style={{ fontWeight: "bold" }}>
          {content.title.length > 20
            ? `${content.title.slice(0, 20)}...`
            : content.title}
        </div>
        <div style={{ fontSize: "0.875rem", color: "#555", marginTop: "5px" }}>
          {content.description.length > 20
            ? `${content.description.slice(0, 20)}...`
            : content.description}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "5px" }}>
          Due Date: {content.dueDate ? formatDate(content.dueDate) : ""}
        </div>
      </div>

      {/* Action Button */}
      <IconButton
        size="small"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "black",
        }}
        onClick={handleButtonClick} // Prevent dragging on button click
      >
        <MoreVertIcon />
      </IconButton>

      {/* Popper */}
      <Popper
        open={isPopperOpen}
        anchorEl={anchorEl} // Correctly set the anchorEl for each item
        placement="bottom-end"
        transition
        style={{ zIndex: 10 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={handleClickAway}>
                <MenuList>
                  <MuiMenuItem
                    onClick={() => {
                      handleClickAway();
                      openEditModal(content); // Open the edit modal for the specific task
                    }}
                    sx={{ color: darkMode ? "#ffffff" : "#121212" }}
                  >
                    Edit
                  </MuiMenuItem>
                  <MuiMenuItem
                    onClick={() => {
                      handleClickAway();
                      handleDelete(content._id); // Handle delete for the specific task
                    }}
                    sx={{ color: darkMode ? "#ffffff" : "#121212" }}
                  >
                    Delete
                  </MuiMenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
