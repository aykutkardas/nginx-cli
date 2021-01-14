const fs = require("fs");
const isExist = require("./isExist");
const { errors } = require("../constant");

module.exports = async function link(sourcePath, newPath) {
  const isExistSource = await isExist(sourcePath);

  if (isExistSource) {
    const isExistTarget = await isExist(newPath);

    if (isExistTarget) {
      console.log(errors.alreadyLinkedFile.red);
      return false;
    }

    try {
      await fs.linkSync(sourcePath, newPath);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    console.log(errors.notFoundSourceFile.red);
    return false;
  }
};
