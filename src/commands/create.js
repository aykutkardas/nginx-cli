const inquirer = require("inquirer");
const fs = require("fs");

const { errors } = require("../constant");

const link = require("../utils/link");
const slugify = require("../utils/slugify");
const getConfig = require("../utils/getConfig");
const parseTemplate = require("../utils/parseTemplate");
const templateReplace = require("../utils/templateReplace");
const list = require("./list");

async function create(params) {
  let confName = (params && params.args[0]) || "default.conf";

  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  let templateContent = "";
  let templateParams;

  try {
    const path = __dirname + "/../" + confName;
    templateContent = await fs.readFileSync(path, "utf8");
    templateParams = parseTemplate(templateContent);
  } catch (err) {
    console.error(errors.createError.red);
    return null;
  }

  if (templateParams)
    (async () => {
      let answers = [];

      for (let i = 0; i < templateParams.length; i++) {
        const answer = await inquirer.prompt([
          {
            message: `What's the value of ${templateParams[i]}?`,
            name: templateParams[i],
            type: "input",
          },
        ]);

        answers.push(answer);
      }

      const confirm = await inquirer.prompt([
        {
          default: true,
          message: "Enable conf file?",
          name: "enable",
          type: "confirm",
        },
      ]);

      const data = { answers: { ...confirm } };

      answers.forEach(
        (answer) => (data.answers = { ...data.answers, ...answer })
      );

      return data.answers;
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
              await link(currentPath, newPath);
            }
            list();
          })
          .catch((err) => console.error("cannot access", err));
      })
      .catch(console.error);
}

module.exports = create;
