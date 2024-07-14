const compression = require("express-compression");
const express = require("express");
const routers = require("./src/routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./src/utils/logger");
const bodyParser = require("body-parser");
const cors = require("cors");
const constants = require("./src/lib/constants");
const connectDB = require("./config/db.config");
const helmet = require("helmet");
const { errorResponseMessage } = require("./src/lib/response.messages");
const { db, rtdb, rtdbs } = require("./config/firebase.config");
const firebaseEventController = require("./src/controllers/event_driven_controller/firebaseEventListener.controller");
const registrationController = require("./src/controllers/event_driven_controller/work_flow_controllers/Registration.Controller");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: logger.stream }));
app.use(bodyParser.json({ limit: "512mb" }));
app.use(bodyParser.urlencoded({ limit: "512mb", extended: false }));
app.use(compression());

// Connect to the mongo DB
// connectDB();


const fact = { temperature: 100 };

/**
 * Get method to test call land to routing
 */
app.use("/", routers);

// Catch the Not Found Request (404) and forward to the error handler
app.use((req, res) => {
  let response = errorResponseMessage(constants.BAD_REQUEST);
  res.status(404).json(response);
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json(constants.SERVER_ERROR);
});

const port = process.env.PORT | 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // firebaseEventController.startListener();
  // registrationController.subscribeUserTableForFreeFoodUser();
  // registrationController.subscribeDeliveryPartnerTableForApproval();
  // registrationController.subscribeRiderTableForApproval();
});

module.exports = app;
