const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  punchIn: {
    type: String,
    required: true,
  },
  punchOut: {
    type: String,
    required: true,
  }
});

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = attendanceModel;
