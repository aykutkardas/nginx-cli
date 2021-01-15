const getConfig = require("../utils/getConfig");
const unlink = require("../utils/unlink");
const list = require("./list");
const { errors } = require("../constant");

module.exports = async function disable(confName) {
  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  const path = paths.sitesEnabled + confName;

  const unlinked = await unlink(path);

  if (unlinked) {
    list();
  } else {
    console.log(errors.unlinkError.red);
  }
};
