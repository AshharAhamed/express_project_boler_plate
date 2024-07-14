const express = require('express');
const constants = require('../../lib/constants');
const router = express.Router();

router.get('/hi', (req, res) => {
    res.status(constants.SUCCESS_STATUS_CODE).json({ "message": "Hello AL-ULAA Team You are in API version 2" });
});

module.exports = router;