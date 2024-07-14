const express = require("express");
const router = express.Router();
const constants = require("../../lib/constants");
const firebaseEventController = require("../../controllers/event_driven_controller/firebaseEventListener.controller");

/* GET programming languages. */
router.get("/startAllListeners", firebaseEventController.startListener);

module.exports = router;
