const Task = require("../models/taskModel");
const createError = require("../utils/appError");

const getAllTasks = async (req, res) => {
  try {
    const { user } = req.body;
    const tasks = await Task.find({ user });

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const addTask = async (req, res) => {
  const { title, description, status, priority, dueDate, user } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user,
    });
    await newTask.save();
    res.json({
      success: true,
      message: "Great!Task added Successfully!",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteTask = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const result = await Task.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return next(new createError("Task Not Found", 404));
    }
    res.json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateTask = async (req, res, next) => {
  const { _id, title, description, status, priority, dueDate } = req.body;
  if (!_id) {
    return next(new createError("Task ID is required", 400));
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(_id, {
      title,
      description,
      status,
      priority,
      dueDate,
    });
    if (!updatedTask) {
      return next(new createError("Task Not Found", 404));
    }
    res.json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = { getAllTasks, addTask, deleteTask, updateTask };
