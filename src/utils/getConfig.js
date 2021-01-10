const fs = require("fs");

module.exports = async function getConfig() {
  const configPath = "/etc/.ngx";
  const error =
    "Please init ngx. Follow this command:".red + "\n\n 'sudo ngx init'";

  try {
    const isExist = await fs.existsSync(configPath);

    if (isExist) {
      const file = await fs.readFileSync("/etc/.ngx", "utf8");
      return JSON.parse(file);
    }
    console.log(error);
  } catch (err) {
    console.log(error);
    return null;
  }
};
