const fs = require("fs");

const isAccessible = require("./isAccessible");
const { paths } = require("../constant");

async function writeFile(path, body) {
  const accesible = await isAccessible(path);

  if (accesible) {
    fs.writeFileSync(paths.config, body);
  }

  return null;
}

module.exports = writeFile;
