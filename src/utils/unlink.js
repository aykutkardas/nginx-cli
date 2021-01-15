const fs = require("fs");
const isAccessible = require("./isAccessible");

module.exports = async function unlink(path) {
  const accessible = await isAccessible(path);

  if (accessible) {
    try {
      await fs.unlinkSync(path);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
