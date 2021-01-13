const fs = require("fs");
const isExist = require("./isExist");

async function readFile(path, flag) {
  const exist = await isExist(path);

  if (exist) {
    const file = await fs.readFileSync(path, flag);
    if (file) {
      return file;
    }
  }

  return null;
}

module.exports = readFile;
