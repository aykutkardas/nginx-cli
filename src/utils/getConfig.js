const readFile = require("./readFile");
const { paths } = require("../constant");

async function getConfig() {
  const config = await readFile(paths.config);

  if (config) {
    return JSON.parse(config);
  }

  return null;
}

module.exports = getConfig;
