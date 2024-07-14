const express = require("express");
const constants = require("../../lib/constants");
const programmingLanguagesRouter = require("./programmingLanguage.route");
const restaurantRouter = require("./restaurant.route");
const usersRouter = require("./users.route");
const recipientsRouter = require("./recipients.route");
const firebaseRealtimeListener = require("./firebaseRealtimeListener.route");
const deliveryPartnerRouter = require("./deliveryPartner.route");
const riderRouter = require("./rider.route");
const workflowRouter = require("./workflow.route");
const router = express.Router();

router.get("/hi", (req, res) => {
  res
    .status(constants.SUCCESS_STATUS_CODE)
    .json({ message: "Hello AL-ULAA Team You are in API Version 1 " });
});

router.use("/programmingLanguages", programmingLanguagesRouter);

router.use("/users", usersRouter);

router.use("/firebaseRealtimeListener", firebaseRealtimeListener);


module.exports = router;
