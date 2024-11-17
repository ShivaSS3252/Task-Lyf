import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFail,
  addTaskRequest,
  addTaskSuccess,
  addTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
} from "../slices/taskSlice";
const API_URL = process.env.REACT_APP_API_URL;
export const fetchTasks = (userId) => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const response = await fetch(`${API_URL}/api/alltasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(fetchTasksSuccess(data.tasks));
    } else {
      dispatch(fetchTasksFail(data.message || "Failed to fetch tasks"));
    }
  } catch (error) {
    dispatch(fetchTasksFail(error.message));
  }
};

// Add a new task
export const addTask = (taskData) => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const response = await fetch(`${API_URL}/api/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(addTaskSuccess(data.task));
    } else {
      dispatch(addTaskFail(data.message || "Failed to add task"));
    }
  } catch (error) {
    dispatch(addTaskFail(error.message));
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(deleteTaskRequest());
  try {
    const response = await fetch(`${API_URL}/api/deletetask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: taskId }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(deleteTaskSuccess(taskId));
    } else {
      dispatch(deleteTaskFail(data.message || "Failed to delete task"));
    }
  } catch (error) {
    dispatch(deleteTaskFail(error.message));
  }
};

// Update a task
export const updateTask = (taskData) => async (dispatch) => {
  dispatch(updateTaskRequest());
  try {
    const response = await fetch(`${API_URL}/api/updateTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    console.log("Sending task data:", taskData, data);
    if (data.success) {
      dispatch(updateTaskSuccess(data.task));
    } else {
      dispatch(updateTaskFail(data.message || "Failed to update task"));
    }
  } catch (error) {
    dispatch(updateTaskFail(error.message));
  }
};
