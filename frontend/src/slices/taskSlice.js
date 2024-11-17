import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    taskDetail: {},
    loading: false,
    error: null,
    isTaskdeleted: false,
    isTaskUpdated: false,
  },
  reducers: {
    fetchTasksRequest(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    fetchTasksSuccess(state, action) {
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    },
    fetchTasksFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    addTaskRequest(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    addTaskSuccess(state, action) {
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };
    },
    addTaskFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteTaskRequest(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    deleteTaskSuccess(state, action) {
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        isTaskdeleted: true,
      };
    },
    deleteTaskFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateTaskRequest(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    updateTaskSuccess(state, action) {
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        isTaskUpdated: true,
      };
    },
    updateTaskFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: null,
      };
    },
    clearTaskDeleted(state) {
      return {
        ...state,
        isTaskDeleted: false,
      };
    },
    clearTaskUpdated(state) {
      return {
        ...state,
        isTaskUpdated: false,
      };
    },
  },
});
const { actions, reducer } = taskSlice;
export const {
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
  clearError,
  clearTaskDeleted,
  clearTaskUpdated,
} = actions;

export default reducer;
