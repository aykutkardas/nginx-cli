const fs = require("fs");

module.exports = async function readDir(path) {
  const files = await fs.promises.readdir(path);
  return files;
};
