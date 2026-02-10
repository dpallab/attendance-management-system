const Attendance = require("../Models/attendance");

// today date helper
// const todayDate = () => new Date().toISOString().split("T")[0];

// ✅ SUBMIT ATTENDANCE
exports.submitAttendance = async (req, res) => {
  try {
    const { name, location, punchIn, punchOut } = req.body;

    if (!name || !location || !punchIn || !punchOut) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // const date = todayDate();


    const attendance = new Attendance({
      name:name,
      location:location,
      punchIn:punchIn,
      punchOut:punchOut
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance submitted successfully",
      attendance,
    });
  } catch (err) {
    console.error("ATTENDANCE ERROR:", err);
    res.status(500).json({
      message: "server error",
    });
  }
};



exports.getAllAttendance = async (req, res) => {
  try {
    const data = await Attendance.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

/**
 * 📌 Delete attendance by ID (Manager)
 */
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Attendance.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};

