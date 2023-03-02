"use strict";

const express = require("express");
const router = express.Router();
const Control = require("./Controllers");

router.route("/server/create").get(Control.Server.Create);
router.route("/check-disk").get(Control.CheckDisk);
router.route("/file/data/:slug/:file_name").get(Control.File.Data);

router.all("*", async (req, res) => {
  res.status(500).end();
});

module.exports = router;
