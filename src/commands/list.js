const readDir = require("../utils/readDir");
const getConfig = require("../utils/getConfig");
const createTable = require("../utils/createTable");
const { table } = require("../constant");

module.exports = async function list() {
  const config = await getConfig();
  if (!config) return;

  const { paths } = config;
  const data = [];

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
            data.push([name, status.green]);
          });

          const tableData = createTable(table.listHead, data);
          console.log(tableData);
        })
        .catch(console.error);
    })
    .catch(console.error);
};
