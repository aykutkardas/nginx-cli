#!/usr/bin/env node

require("colors");

const program = require("commander");

program.command("init").action(require("./init"));
program.command("list").action(require("./list"));
program.command("create").action(require("./create"));
program.command("enable <conf_name>").action(require("./enable"));
program.command("disable <conf_name>").action(require("./disable"));

program.parse(process.argv);
