const getConfig = require("../utils/getConfig");
const link = require("../utils/link");
const list = require("./list");

module.exports = async function enable(confName) {
  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  const currentPath = paths.sitesAvailable + confName;
  const newPath = paths.sitesEnabled + confName;

  const isLinked = await link(currentPath, newPath);

  if (isLinked) {
    list();
  }
};
