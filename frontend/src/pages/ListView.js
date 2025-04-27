import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "../actions/taskActions";
import AddTask from "./AddTask";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  Paper,
  IconButton,
  Popper,
  MenuList,
  MenuItem as MuiMenuItem,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";
const ListView = () => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { userData } = useAuth();

  const [open, setopen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    if (userData?._id) {
      dispatch(fetchTasks(userData._id));
    }
  }, [dispatch, userData]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const columns = [
    { field: "id", headerName: "Sl No", width: 150 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 190,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            value={params.row.status}
            onChange={(e) => handleStatusChange(e, params.row._id)}
            label="Status"
            variant="filled"
            sx={{
              "& .MuiSelect-select": {
                padding: "2px 22px",
                lineHeight: 3,
                backgroundColor: darkMode ? "#2c3e4c" : "#efefef",
                color: darkMode ? "#ffffff" : "#121212", // Text color inside Select
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? "#2c3e50" : "#ffffff", // Background for dropdown
                  "& .MuiMenuItem-root": {
                    color: darkMode ? "#ffffff" : "#121212", // Text color for all menu items
                    "&:hover": {
                      backgroundColor: darkMode ? "#1a252f" : "#dddddd", // Hover effect
                    },
                  },
                },
              },
            }}
          >
            {["To Do", "In Progress", "Completed"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 190,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            value={params.row.priority}
            onChange={(e) => handlePriorityChange(e, params.row._id)}
            label="Priority"
            variant="filled"
            sx={{
              "& .MuiSelect-select": {
                padding: "2px 22px",
                lineHeight: 3,
                backgroundColor: darkMode ? "#2c3e4c" : "#efefef",
                color: darkMode ? "#ffffff" : "#121212", // Text color inside Select
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? "#2c3e50" : "#ffffff", // Background for dropdown
                  "& .MuiMenuItem-root": {
                    color: darkMode ? "#ffffff" : "#121212", // Text color for all menu items
                    "&:hover": {
                      backgroundColor: darkMode ? "#1a252f" : "#dddddd", // Hover effect
                    },
                  },
                },
              },
            }}
          >
            {["Low", "Medium", "High"].map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 190,
      renderCell: (params) => (
        <span>{params.row.dueDate ? formatDate(params.row.dueDate) : ""}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 112,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuClick(event, params.row._id)}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
          <Popper
            open={selectedTask === params.row._id}
            anchorEl={anchorEl}
            placement={"bottom-end"}
            transition
            sx={{
              zIndex: 10,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <MenuList>
                      <MuiMenuItem
                        onClick={() => handleEdit(params.row)}
                        sx={{ color: darkMode ? "#ffffff" : "#121212" }}
                      >
                        Edit
                      </MuiMenuItem>
                      <MuiMenuItem
                        onClick={() => handleDelete(params.row._id)}
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
        </>
      ),
    },
  ];

  const rows = tasks
    ?.map((item) => ({
      _id: item._id,
      title: item.title,
      description: item.description,
      status: item.status,
      priority: item.priority,
      dueDate: item.dueDate,
    }))
    .reverse()
    .map((item, index) => ({
      ...item,
      id: index + 1,
    }));

  const filteredRows = rows.filter(
    (task) =>
      (statusFilter ? task.status === statusFilter : true) &&
      (priorityFilter ? task.priority === priorityFilter : true)
  );

  const paginationModel = { page: 0, pageSize: 5 };

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(taskId);
  };

  const handleClickAway = () => {
    setSelectedTask(null); // Close the Popper when clicking away
  };

  const handleEdit = (taskId) => {
    setSelectedTask(taskId); // Close the Popper
    setopen(true);
    setEdit(true);
    // Here, pass the taskId to AddTask or fetch task data to prefill the form
  };

  const handleDelete = async (taskId) => {
    setSelectedTask(null); // Close the Popper
    await dispatch(deleteTask(taskId));
    dispatch(fetchTasks(userData._id));
    toast.success("Task deleted successfully!");
  };

  const handleStatusChange = async (e, taskId) => {
    const updatedTask = { _id: taskId, status: e.target.value };
    await dispatch(updateTask(updatedTask));
    dispatch(fetchTasks(userData._id));
    toast.success("Task updated successfully!");
  };

  const handlePriorityChange = async (e, taskId) => {
    const updatedTask = { _id: taskId, priority: e.target.value };
    await dispatch(updateTask(updatedTask));
    dispatch(fetchTasks(userData._id));
    toast.success("Task updated successfully!");
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ marginBottom: 2 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            variant="outlined"
            sx={{
              "& .MuiSelect-select": {
                padding: "2px 22px",
                lineHeight: 2,
                backgroundColor: darkMode ? "#2c3e4c" : "#efefef",
                color: darkMode ? "#ffffff" : "#121212", // Text color inside Select
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? "#2c3e50" : "#ffffff", // Background for dropdown
                  "& .MuiMenuItem-root": {
                    color: darkMode ? "#ffffff" : "#121212", // Text color for all menu items
                    "&:hover": {
                      backgroundColor: darkMode ? "#1a252f" : "#dddddd", // Hover effect
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">
              <span style={{ color: darkMode ? "#ffffff" : "#121212" }}>
                All Status
              </span>
            </MenuItem>
            {["To Do", "In Progress", "Completed"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ marginBottom: 2 }}>
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            displayEmpty
            variant="outlined"
            sx={{
              "& .MuiSelect-select": {
                padding: "2px 22px",
                lineHeight: 2,
                backgroundColor: darkMode ? "#2c3e4c" : "#efefef",
                color: darkMode ? "#ffffff" : "#121212", // Text color inside Select
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? "#2c3e50" : "#ffffff", // Background for dropdown
                  "& .MuiMenuItem-root": {
                    color: darkMode ? "#ffffff" : "#121212", // Text color for all menu items
                    "&:hover": {
                      backgroundColor: darkMode ? "#1a252f" : "#dddddd", // Hover effect
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">
              <span style={{ color: darkMode ? "#ffffff" : "#121212" }}>
                All Priority
              </span>
            </MenuItem>
            {["Low", "Medium", "High"].map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <AddTask
          open={open}
          setopen={setopen}
          taskId={selectedTask}
          edit={edit}
          setEdit={setEdit}
        />
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "black",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "white",
            },
            "& .MuiDataGrid-row": {
              color: darkMode ? "#ffffff" : "#000000", // Text color for all rows
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ListView;
