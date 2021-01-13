#!/usr/bin/env node

require("colors");

const program = require("commander");

program.command("init").action(require("./commands/init"));
program.command("list").action(require("./commands/list"));
program.command("create").action(require("./commands/create"));
program.command("enable <conf_name>").action(require("./commands/enable"));
program.command("disable <conf_name>").action(require("./commands/disable"));

program.parse(process.argv);
