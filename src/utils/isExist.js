const fs = require("fs");

async function isExist(path) {
  const isExist = await fs.existsSync(path);

  if (isExist) {
    return true;
  } else {
    return false;
  }
}

module.exports = isExist;
