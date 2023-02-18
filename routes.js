"use strict";

const express = require("express");
const router = express.Router();
const Control = require("./Controllers");

router.route("/server/create").get(Control.Server.Create);
router.route("/check-disk").get(Control.CheckDisk);

router.all("*", async (req, res) => {
  res.status(500).end();
});

module.exports = router;
