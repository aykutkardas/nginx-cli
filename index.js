#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
 .usage("Usage:")
 .usage("--list")
 .usage("--enable <conf>")
 .usage("--disable <conf>")
 .option("l", { alias: "list", describe: "List nginx conf files.", type: "string", demandOption: false })
 .option("e", { alias: "enable", describe: "Enable conf file", type: "string", demandOption: false })
 .option("d", { alias: "disable", describe: "Disable conf file", type: "string", demandOption: false })
 .argv;

console.log(options);