const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const schedules = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cook_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CookSchema',
    required: true,
  },
  schedule_title: {
    type: String,
    required: true,
  },
  schedule_start: {
    type: Date,
    required: true,
  },
  schedule_end: {
    type: Date,
    required: true,
  }
});

const ScheduleScehma = mongoose.model('Schedule', schedules);

module.exports = ScheduleScehma;