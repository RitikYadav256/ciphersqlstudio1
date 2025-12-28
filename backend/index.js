const express = require("express");
const cors = require("cors");
const AssignmentRoutes = require("./routes/AssignmentRoutes.js");
const CodeRoutes = require("./routes/CodeRoutes.js");
const AuthRoutes = require("./routes/AuthRoutes.js");
const connectDB = require("./models/MongoDB.js");
const app = express();
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Backend is running");
})

app.use("/api/fetch", AssignmentRoutes);
app.use("/api/code", CodeRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(5000, () => {
  console.log(`Server is running http://localhost:${5000}`);
});