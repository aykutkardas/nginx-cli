const errors = {
  nonExist: "File or directory not found.",
  notAccessible: "File or directory not accessible.",
  notFoundSourceFile: "The file to link was not found.",
  alreadyLinkedFile: "This file is already linked.",
  unlinkError: "There was a problem removing the file.",
  createError: "Try again as sudo. Make sure the template file you specified exists."
};

const table = {
  listHead: ["Conf Name".blue, "Status".blue],
  templateHead: ["Template Name".blue],
};

const paths = {
  config: "/etc/.nginx-cli/config.json",
  templates: "/etc/.nginx-cli/templates",
  nginxBasePath: "/etc/nginx",
  sitesAvailable: "/sites-available/",
  sitesEnabled: "/sites-enabled/",
};

module.exports = { errors, paths, table };
