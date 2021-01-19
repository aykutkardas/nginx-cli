const parseTemplate = (template) => {
  const regex = new RegExp("{{[A-Z]*}}", "gmi");

  const params = {};

  while ((param = regex.exec(template)) !== null) {
    params[param] = param[0].replace(/[{}]/g, '');
  }

  return Object.values(params);
};

module.exports = parseTemplate;
