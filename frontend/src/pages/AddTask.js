import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addTask, fetchTasks, updateTask } from "../actions/taskActions"; // Adjust this path based on your project structure
import { useAuth } from "../contexts/AuthContext";

const AddTask = (props) => {
  console.log("addprops", props);
  const { open, setopen, taskId, edit, setEdit } = props;
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const handleClose = () => {
    setopen(false);
    setEdit(false);
  };

  // Initial values for Formik
  let initial = {};
  if (edit) {
    initial = {
      _id: taskId._id,
      title: taskId.title,
      description: taskId.description,
      status: taskId.status,
      priority: taskId.priority,
      dueDate: taskId.dueDate
        ? new Date(taskId.dueDate).toISOString().split("T")[0]
        : "",
    };
  } else {
    initial = {
      title: "",
      description: "",
      status: "To Do",
      priority: "Low",
      dueDate: "",
      user: userData._id,
    };
  }
  // Validation Schema for Formik
  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter the task title"),
    status: Yup.string().required("Please select a status"),
    priority: Yup.string().required("Please select a priority"),
  });

  // Formik onSubmit handler
  const handleAddTask = (values, { resetForm }) => {
    const taskData = { ...values, user: userData._id };
    dispatch(addTask(taskData));
    resetForm(); // Reset the form after adding a task
    handleClose();
  };
  const handleEditTask = (values) => {
    const taskData = { ...values, user: userData._id }; // Replace "userId" with actual logged-in user's ID
    dispatch(updateTask(taskData)); // Dispatch action to add the task
    dispatch(fetchTasks(userData._id));
    handleClose();
    setEdit(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <Button
        onClick={() => setopen(true)}
        variant="outlined"
        style={{
          backgroundColor: "#000000",
          color: "white",
          fontWeight: "bold",
        }}
        startIcon={<AddIcon sx={{ fontSize: 20 }} />}
      >
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ m: 0, px: 4, fontWeight: "bold" }}>
          {edit ? "Edit Task" : "Add Task"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            padding: 2,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ m: 0, px: 4 }}>
          <Formik
            initialValues={initial}
            validationSchema={validationSchema}
            onSubmit={edit ? handleEditTask : handleAddTask}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Form>
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // Keeps label aligned when height is reduced
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px", // Adjust the height as needed
                    },
                  }}
                  // margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true, // Keeps label aligned when height is reduced
                  }}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  multiline // Enables multi-line input, turning the TextField into a textarea
                  rows={3} // Sets the initial number of visible rows
                  maxRows={3}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Status"
                    sx={{
                      height: "36px", // Adjust the height of the select box
                      display: "flex",
                      alignItems: "center", // Center the selected text vertically
                      padding: "5px 0px", // Adjust padding if needed
                    }}
                    error={touched.status && !!errors.status}
                  >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                  <ErrorMessage
                    name="status"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Priority"
                    sx={{
                      height: "36px", // Adjust the height of the select box
                      display: "flex",
                      alignItems: "center", // Center the selected text vertically
                      padding: "5px 0px", // Adjust padding if needed
                    }}
                    error={touched.priority && !!errors.priority}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>
                <TextField
                  label="Due Date"
                  type="date"
                  name="dueDate"
                  value={values.dueDate || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true, // Keeps label aligned when height is reduced
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px", // Adjust the height as needed
                    },
                  }}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0], // Setting today's date as the minimum value
                  }}
                />
                <DialogActions sx={{ m: 0 }}>
                  <Button
                    autoFocus
                    type="submit"
                    sx={{
                      backgroundColor: "#000000",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {edit ? "Edit Task" : "Add Task"}
                  </Button>
                  {console.log("addeddata", values)}
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddTask;