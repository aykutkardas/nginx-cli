const fs = require("fs");
const { errors } = require("../constant");

async function isExist(path) {
  const isExist = await fs.existsSync(path);

  if (isExist) {
    return true;
  } else {
    return false;
  }
}

module.exports = isExist;
