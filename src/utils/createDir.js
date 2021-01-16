const fs = require("fs");
const isAccessible = require("./isAccessible");

async function createDir(path, authorization = 0777) {
  const accesible = await isAccessible(path);

  if (!accesible) {
    fs.mkdirSync(path, authorization);
    return true;
  }

  return false;
}

module.exports = createDir;

