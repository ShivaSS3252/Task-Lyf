import React, { useEffect, useState } from "react";
import { deleteTask, fetchTasks, updateTask } from "../actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import AddTask from "./AddTask";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Droppable } from "./Droppable";
import { SortableItem } from "./SortableItem";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
const BroadView = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const [edit, setEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks } = useSelector((state) => state.tasks);
  const [open, setopen] = useState(false);
  const [columns, setColumns] = useState({
    ToDo: [],
    InProgress: [],
    Completed: [],
  });
  const [activeId, setActiveId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update tasks based on status
  useEffect(() => {
    if (userData?._id) {
      dispatch(fetchTasks(userData._id));
    }
  }, []);

  useEffect(() => {
    // Dynamically update columns based on tasks
    const updatedColumns = {
      ToDo: tasks.filter((task) => task.status === "To Do"),
      InProgress: tasks.filter((task) => task.status === "In Progress"),
      Completed: tasks.filter((task) => task.status === "Completed"),
    };
    setColumns(updatedColumns);
    console.log("tasksbroad", updatedColumns);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    setActiveId(null);

    const [sourceColumnId, sourceIndex] = active.id.split("-");
    const [destinationColumnId, destinationIndex] = over.id.split("-");

    // Get the dragged task and define its new status
    const draggedTask = columns[sourceColumnId][sourceIndex];
    let newStatus = destinationColumnId;

    // Adjust newStatus format for consistency
    if (newStatus === "ToDo") newStatus = "To Do";
    if (newStatus === "InProgress") newStatus = "In Progress";

    if (sourceColumnId !== destinationColumnId) {
      // Remove the task from source column and add to destination column
      const sourceItems = [...columns[sourceColumnId]];
      const destinationItems = [...columns[destinationColumnId]];
      const [movedItem] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, movedItem);

      setColumns({
        ...columns,
        [sourceColumnId]: sourceItems,
        [destinationColumnId]: destinationItems,
      });

      // Dispatch action to update the task status in the backend
      const updatedTask = { _id: draggedTask._id, status: newStatus };
      console.log("updatedTask", updatedTask);
      await dispatch(updateTask(updatedTask));
      toast.success("Task Updated Successfully");
      dispatch(fetchTasks(userData._id)); // Re-fetch tasks after updating
    } else {
      // If staying in the same column, reorder items within the column
      const reorderedItems = arrayMove(
        columns[sourceColumnId],
        sourceIndex,
        destinationIndex
      );
      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumnId]: reorderedItems,
      }));
    }
  };

  const getItemContentById = (id) => {
    const [columnId, index] = id.split("-");
    return columns[columnId]?.[index];
  };

  const gridStyle = {
    display: "grid",
    gap: "110px",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "0 auto",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",

    ...(windowWidth <= 1024 && {
      gridTemplateColumns: "repeat(2, 1fr)",
      maxWidth: "1024px",
    }),
    ...(windowWidth <= 768 && {
      gridTemplateColumns: "repeat(1, 1fr)",
      maxWidth: "768px",
    }),
    ...(windowWidth <= 480 && {
      gridTemplateColumns: "1fr",
      maxWidth: "480px",
    }),
  };
  const openEditModal = (taskId) => {
    console.log("taskiddata", taskId);
    setEdit(true);
    setSelectedTask(taskId); // Set the selected task ID for editing
    setopen(true); // Open the modal
  };
  const handleDelete = async (taskId) => {
    setSelectedTask(null); // Close the Popper
    await dispatch(deleteTask(taskId));
    dispatch(fetchTasks(userData._id));
    toast.success("Task deleted successfully!");
  };
  console.log("openEditModal function in BroadView:", openEditModal);

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <AddTask
          open={open}
          setopen={setopen}
          edit={edit}
          setEdit={setEdit}
          taskId={selectedTask}
        />
      </Box>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={gridStyle}>
          {Object.entries(columns).map(([columnId, items]) => (
            <Droppable key={columnId} id={columnId} title={columnId}>
              <SortableContext
                items={items.map((_, index) => `${columnId}-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Tasks: {items.length}
                </div>
                {items.map((item, index) => (
                  <SortableItem
                    key={`${columnId}-${index}`}
                    id={`${columnId}-${index}`}
                    content={item}
                    status={columnId}
                    openEditModal={openEditModal}
                    handleDelete={handleDelete}
                  />
                ))}
                {console.log("columniddata", columnId)}
              </SortableContext>
            </Droppable>
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <SortableItem
              id={activeId}
              content={getItemContentById(activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default BroadView;
