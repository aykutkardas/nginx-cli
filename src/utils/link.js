const fs = require("fs");

module.exports = async function link(path, newPath) {
  try {
    await fs.linkSync(path, newPath);
    return true;
  } catch (err) {
    return false;
  }
};
