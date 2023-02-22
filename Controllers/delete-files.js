"use strict";

const { Storages } = require(`../Models`);
const { CheckDisk, GetIP, GetHN } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    const sv_ip = await GetIP();
    const sv_name = await GetHN();
    if (!sv_ip) return res.json({ status: false });

    let row = await Storages.Lists.findOne({
      raw: true,
      where: { sv_ip },
    });

    if (!row) return res.json({ status: false, msg: "not_exists" });

    let disk = await CheckDisk();

    let update_data = {
      ...disk,
    };

    if (disk?.disk_percent >= 90) {
      update_data.active = 0;
    }

    let db_update = await Storages.Lists.update(update_data, {
      where: { sv_ip },
    });

    if (db_update.length > 0) {
      return res.json({ status: true, msg: `updated` });
    } else {
      return res.json({ status: false, msg: `db_err` });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: error.name });
  }
};
