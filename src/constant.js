const errors = {
  nonExist: "File or directory not found.",
  notAccessible: "File or directory not accessible.",
  notFoundSourceFile: "The file to link was not found.",
  alreadyLinkedFile: "This file is already linked.",
  unlinkError: "There was a problem removing the file." 
};

const paths = {
  config: "/etc/.ngx",
  base: "/etc/nginx",
  sitesAvailable: "/sites-available/",
  sitesEnabled: "/sites-enabled/",
};

module.exports = { errors, paths };
