const getConfig = require("../utils/getConfig");
const link = require("../utils/link");
const list = require("./list");

module.exports = async function enable(conf_name) {
  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  const currentPath = paths.sitesAvailable + conf_name;
  const newPath = paths.sitesEnabled + conf_name;

  const isLinked = await link(currentPath, newPath);

  if (isLinked) {
    list();
  } else {
    console.log(
      "An unexpected problem occurred!\n\n".red,
      "Try with `sudo`"
    );
  }
};
