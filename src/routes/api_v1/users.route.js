const express = require('express');
const router = express.Router();
const constants = require('../../lib/constants');
const usersController = require('../../controllers/users.controller');

/* GET programming languages. */
router.get('/', usersController.getAllUsers);

module.exports = router;