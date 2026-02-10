const express = require("express");
const router = express.Router();
const attendance = require("../Controllers/attendanceController")

// submit attendance
router.post("/submit", attendance.submitAttendance);
router.get("/all", attendance.getAllAttendance);
router.delete("/delete/:id", attendance.deleteAttendance);

module.exports = router;
