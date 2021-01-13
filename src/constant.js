const errors = {
  nonExist: "File or directory not found.",
  notAccessible: "File or directory not accessible."
};

const paths = {
  config: "/etc/.ngx",
  base: "/etc/nginx",
  sitesAvailable: "/sites-available/",
  sitesEnabled: "/sites-enabled/",
};

module.exports = { errors, paths };
