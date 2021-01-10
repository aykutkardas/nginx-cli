const Table = require("cli-table3");
const readDir = require("./utils/readDir");
const getConfig = require("./utils/getConfig");

module.exports = async function list() {
  const table = new Table({
    head: ["Conf Name".blue, "Status".blue],
  });

  const config = await getConfig();

  if (!config) return;

  const { paths } = config;

  readDir(paths.sitesAvailable)
    .then(function (sitesAvailable) {
      readDir(paths.sitesEnabled)
        .then(function (sitesEnabled) {
          const result = {};

          sitesAvailable.forEach(function (item) {
            const isEnabled = sitesEnabled.includes(item);
            result[item] = isEnabled ? "enabled" : "";
          });

          Object.entries(result).forEach(([name, status]) => {
            table.push([name, status.green]);
          });

          console.log(table.toString());
        })
        .catch(console.error);
    })
    .catch(console.error);
};
