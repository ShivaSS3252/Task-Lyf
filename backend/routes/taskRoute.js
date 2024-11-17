const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();
router.post("/alltasks", taskController.getAllTasks);
router.post("/addtask", taskController.addTask);
router.post("/deletetask", taskController.deleteTask);
router.post("/updateTask", taskController.updateTask);
module.exports = router;
