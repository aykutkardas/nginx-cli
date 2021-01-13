const fs = require("fs");
const getConfig = require("../utils/getConfig");
const list = require("./list");

module.exports = async function disable(conf_name) {
  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  const path = paths.sitesEnabled + conf_name;

  try {
    fs.unlinkSync(path);
    list();
  } catch (err) {
    console.log("An unexpected problem occurred!\n\n".red, "Try with `sudo`");
  }
};
