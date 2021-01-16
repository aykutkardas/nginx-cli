module.exports = function (str, values) {
  let newStr = str;

  for (key in values) {
    const regex = new RegExp(`\{\{${key}\}\}`, "gmi");
    newStr = newStr.replace(regex, values[key]);
  }

  return newStr;
};
