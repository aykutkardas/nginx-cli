const inquirer = require("inquirer");
const fs = require("fs");

module.exports = function init() {
  const paths = {
    base: "/etc/nginx",
    sitesAvailable: "/sites-available/",
    sitesEnabled: "/sites-enabled/",
  };

  (async () => {
    const ans1 = await inquirer.prompt([
      {
        default: paths.base,
        message: "nginx path?",
        name: "base",
        type: "input",
      },
    ]);

    const ans2 = await inquirer.prompt([
      {
        default: ans1.base + paths.sitesAvailable,
        message: "sites-available path?",
        name: "sitesAvailable",
        type: "input",
      },
    ]);

    const ans3 = await inquirer.prompt([
      {
        default: ans1.base + paths.sitesEnabled,
        message: "sites-enabled path?",
        name: "sitesEnabled",
        type: "input",
      },
    ]);
    return { ...ans1, ...ans2, ...ans3 };
  })()
    .then((asnwers) => {
      const fsPromises = fs.promises;

      fsPromises
        .access("/etc", fs.constants.R_OK | fs.constants.W_OK)
        .then(() => {
          fs.writeFileSync(
            "/etc/.ngx",
            JSON.stringify({ paths: asnwers }, null, 2) + "\n"
          );
        })
        .catch(() => console.error("cannot access"));
    })
    .catch(console.error);
};
