const express = require('express');
const router = express.Router();


const Schedule = require("../schema/ScehduleSchema");

router.get('/:scheduleId',scheduleController.read);


    module.exports = router;