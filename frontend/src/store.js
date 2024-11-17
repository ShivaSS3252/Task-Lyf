import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import taskReducer from "./slices/taskSlice";
const reducer = combineReducers({
  tasks: taskReducer,
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Use named import here
});
export default store;
