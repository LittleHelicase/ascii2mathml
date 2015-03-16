#!/usr/bin/env node

"use strict";

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var ascii2mathml = require('../');

if (argv['h'] || argv['help']) {
  fs.createReadStream(__dirname + "/usage.txt")
    .pipe(process.stdout)
    .on("close", function() { process.exit(1); });
  return;
}

var options = {
  annotate: argv['a'] || argv['annotate'],
  bare: argv['b'] || argv['bare'],
  display: argv['d'] || argv['display'] ? "block" : "",
  standalone: argv['s'] || argv['standalone']
};

if (typeof argv._[0] === "string") {
  let ascii = argv._[0];
  process.stdout.write(ascii2mathml(String(ascii), options) + '\n');
}
else {
  process.stdin.on('readable', function() {
    let ascii = process.stdin.read();
    if (ascii !== null) {
      process.stdout.write(ascii2mathml(String(ascii), options) + '\n');
    }
  });
}