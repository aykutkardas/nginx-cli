const fs = require("fs");
const isExist = require("./isExist");
const { errors } = require("../constant");

async function isAccessible(path) {
  const exist = await isExist(path);

  if (exist) {
    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (err) {}
  }

  console.log(errors.notAccessible);
  return false;
}

module.exports = isAccessible;
