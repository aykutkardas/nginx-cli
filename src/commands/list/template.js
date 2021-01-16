const readDir = require("../../utils/readDir");
const createTable = require("../../utils/createTable");
const { table, paths } = require("../../constant");

async function template() {
  readDir(paths.templates)
    .then(function (temlpates) {
      const data = [];

      temlpates.forEach((template) => {
        data.push([template]);
      });

      const tableData = createTable(table.templateHead, data);
      console.log(tableData);
    })
    .catch(console.error);
}

module.exports = template;
