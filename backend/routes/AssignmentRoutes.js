const express = require("express");
const pool = require("../models/db.js");
const Assignment = require("../models/Assignment.js");
const { fetchAssignments } = require("../controller/assignmentController.js");
const  authMiddleware  = require("../middleware/authMiddleware.js");

const router = express.Router();


router.get("/assignments",fetchAssignments);



module.exports = router;



