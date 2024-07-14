const express = require("express");
const constants = require("../lib/constants");
const config = require("config");
const { db, rtdbr, rtdbs } = require("../../config/firebase.config");
const { Engine, Fact } = require("json-rules-engine");
const RuleEngineResturentFilerService = require("../services/ruleEngineResturentFilter.service");
const GoogleApiService = require("../services/googleMapApi.service");

const apiVersion = config.get("apiVersion");

const router = express.Router();

// Dynamically API can be switch between versions
router.use(`/api/${apiVersion}`, require(`./api_${apiVersion}`));

module.exports = router;
