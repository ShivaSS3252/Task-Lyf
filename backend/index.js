const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const taskRouter = require("./routes/taskRoute");
const app = express();
require("dotenv").config();
//1)Middlewares
app.use(express.json());
app.use(cors());
//2)Route
app.use("/api/auth", authRouter);
app.use("/api", taskRouter);

//3)MONGODb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((error) => console.error("Failed to connect mongo DB", error));
//4)global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.send("Hello World from TaskLyf!");
});

//5)Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});
