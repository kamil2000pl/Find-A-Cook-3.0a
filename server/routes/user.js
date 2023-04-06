const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);
router.get('/', userController.readAll);
router.get('/:userId', userController.read);
router.delete('/:userId', userController.delete);

module.exports = router;
