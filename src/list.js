const fs = require("fs");
const Table = require("cli-table3");

module.exports = function list() {
  const table = new Table({
    head: ["Conf Name".blue, "Status".blue],
  });

  table.push(["default", "enable".green]);

  console.log(table.toString());
};
