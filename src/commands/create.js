const inquirer = require("inquirer");
const fs = require("fs");

const link = require("../utils/link");
const slugify = require("../utils/slugify");
const getConfig = require("../utils/getConfig");
const templateReplace = require("../utils/templateReplace");

const list = require("./list");

module.exports = async function crate() {
  const error =
    "Please init ngx. Follow this command:".red + "\n\n 'sudo ngx init'";
  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  let templateContent = "";

  try {
    const path = __dirname + "/../default.conf";
    templateContent = await fs.readFileSync(path, "utf8");
  } catch (err) {
    console.log(error);
    return null;
  }

  (async () => {
    const ans1 = await inquirer.prompt([
      {
        default: "example.com",
        message: "What's the value of DOMAIN?",
        name: "DOMAIN",
        type: "input",
      },
    ]);

    const ans2 = await inquirer.prompt([
      {
        default: "/home/projects/example",
        message: "What's the value of ROOT?",
        name: "ROOT",
        type: "input",
      },
    ]);

    const ans3 = await inquirer.prompt([
      {
        default: true,
        message: "Enable conf file?",
        name: "enable",
        type: "confirm",
      },
    ]);
    return { ...ans1, ...ans2, ...ans3 };
  })()
    .then((asnwers) => {
      const confContent = templateReplace(templateContent, {
        ...asnwers,
        serverNameSlug: slugify(asnwers.DOMAIN),
      });

      fs.promises
        .access("/etc", fs.constants.R_OK | fs.constants.W_OK)
        .then(async () => {
          const conf_name = slugify(asnwers.DOMAIN, "_") + ".conf";
          const currentPath = paths.sitesAvailable + conf_name;
          const newPath = paths.sitesEnabled + conf_name;

          await fs.writeFileSync(currentPath, confContent);
          if (asnwers.enable) {
            const isLinked = await link(currentPath, newPath);

            if (!isLinked) {
              console.log(
                "An unexpected problem occurred!\n\n".red,
                "Try with `sudo`"
              );
            }
          }
          list();
        })
        .catch((err) => console.error("cannot access", err));
    })
    .catch(console.error);
};
