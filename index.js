#!/usr/bin/env node

const app = require('express')();
const bodyParser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');
var problem = require('./problem.js')
var diff = require('./diff.js')

const port = 10045;
app.use(bodyParser.json());
app.use('/', problem);
diff.compare();

var server = app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(chalk.yellow('Start Parsing...'));
});

