const Cook = require('./../models/Schedule');
const fs = require('fs');

exports.read = async (req, res) => {
    try {
      const scheduleId = req.params.scheduleId
      const schedule = await Schedule.findById(scheduleId);

      res.json(schedule);
      console.log(schedule);
    } catch (err) {
      console.log('Schedule Read Error: ', err);
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };