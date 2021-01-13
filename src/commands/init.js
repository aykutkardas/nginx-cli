const inquirer = require("inquirer");

const { paths } = require("../constant");
const writeFile = require("../utils/writeFile");

function init() {
  (async () => {
    const nginxPath = await inquirer.prompt([
      {
        default: paths.base,
        message: "What's the path of NGINX?",
        name: "base",
        type: "input",
      },
    ]);

    const sitesAvailable = await inquirer.prompt([
      {
        default: nginxPath.base + paths.sitesAvailable,
        message: "What's the path of sites-available?",
        name: "sitesAvailable",
        type: "input",
      },
    ]);

    const sitesEnabled = await inquirer.prompt([
      {
        default: nginxPath.base + paths.sitesEnabled,
        message: "What's the path of sites-enabled?",
        name: "sitesEnabled",
        type: "input",
      },
    ]);
    return { ...nginxPath, ...sitesAvailable, ...sitesEnabled };
  })()
    .then(async (asnwers) => {
      const content = JSON.stringify({ paths: asnwers }, null, 2) + "\n";
      await writeFile(paths.config, content);
    })
    .catch(console.error);
}

module.exports = init;
