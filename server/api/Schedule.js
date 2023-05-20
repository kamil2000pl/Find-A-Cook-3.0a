const express = require('express');
const router = express.Router();
require('dotenv').config();
const Schedule = require('../models/Schedule');

//Schedule stuff

router.post("/addschedules", (req,res) => {
    const {schedule_title, schedule_start, schedule_end, schedule_address } = req.body;
    if (!schedule_title || !schedule_start || !schedule_end || !schedule_address) {
        return res.status(400).send('All fields are required');
    }

    const currentDate = new Date();
    const schedule = new Schedule({
        schedule_title: schedule_title,
        schedule_start: schedule_start,
        schedule_end: schedule_end,
        schedule_address: schedule_address
    });

    schedule
    .save()
    .then((result) => {
        res.json({
            status: "SUCCESS",
            message: "successfully saved schedule",
        })
    })
    .catch((err) => {
        res.json({
            status: "FAILED",
            message: "An error occured!",
        })
    })
});

router.get("/schedules", (req, res) => {
    console.log(req.session)
    const schedule = req.session.schedule;
    if(schedule) {
        res.json({
            status: "SUCCESS",
            title: `${schedule.schedule_title}`,
            start: `${schedule.schedule_start}`,
            end: `${schedule.schedule_end}`,
            address: `${schedule.schedule_address}`
        })
    } else {
        res.json({
            status: "FAILED",
            message: "Error finding schedule"
        })
    }
});


module.exports = router;