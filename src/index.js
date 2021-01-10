#!/usr/bin/env node

require("colors");

const program = require("commander");

const init = require("./init");
const list = require("./list");

program.command("init").action(init);
program.command("list").action(list);

program.parse(process.argv);
