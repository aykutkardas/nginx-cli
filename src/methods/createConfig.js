const fs = require("fs");
const getConfig = require("../utils/getConfig");
const createDir = require("../utils/createDir");
const link = require("../utils/link");

async function createConfig() {
  const olConfig = await getConfig();
  const configPath = "/etc/.nginx-cli";

  if (!olConfig) {
    const isCreatedDir = await createDir(configPath);

    if (isCreatedDir) {
      await fs.writeFileSync(configPath + "/config.json", "");
      const templatePath = configPath + "/templates";
      const isCreatedTemplateDir = await createDir(templatePath);

      if (isCreatedTemplateDir) {
        await link(
          __dirname + "/../default.conf",
          templatePath + "/default.conf"
        );
      }

      return true;
    }
  }

  return false;
}

module.exports = createConfig;
