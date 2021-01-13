const fs = require("fs");
const isAccessible = require("./isAccessible");

async function readFile(path, flag) {
  const accesible = await isAccessible(path);

  if (accesible) {
    const file = await fs.readFileSync(path, flag);
    if (file) {
      return file;
    }
  }

  return null;
}

module.exports = readFile;
