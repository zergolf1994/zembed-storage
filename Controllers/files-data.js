"use strict";

const fs = require("fs-extra");

module.exports = async (req, res) => {
  try {
    let { slug, file_name } = req.params;
    if (!slug || !file_name) return res.json({ status: false });

    let file_target = `${global.dirPublic}${slug}/${file_name}`;

    if (!fs.existsSync(file_target))
      return res.json({ status: false, msg: "no_file" });

    let stats = fs.statSync(file_target);
    let { size } = stats;
    return res.json({ status: true, size });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: error.name });
  }
};
