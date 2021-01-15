const Table = require("cli-table3");

function createTable(head, data) {
  if (!Array.isArray(head) || !Array.isArray(data)) {
    return null;
  }

  const table = new Table({ head });
  table.push(...data);
  return table.toString();
}

module.exports = createTable;
