#!/usr/bin/env node

const app = require('express')();
const bodyParser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');
var problem = require('./problem.js')
var diff = require('./diff.js')
var different = require('./different.js')
const yargs = require('yargs')

var argv = yargs
  .command('contest <number>', 'fetch data from a contest')
  .command('problem <names...>', 'fetch the list of problems')
  .command('test', 'runs the code against test cases')
  .demandCommand(1)
  .help()
  .argv

const port = 10045;
app.use(bodyParser.json());

var cnt = 0; var p = 0;

app.post('/', (req, res)=>{
  const data = req.body;
  if(argv._[0]=='contest'){
    problem.pc(p++, cnt, data);
  } 
  else if(argv._[0]=='problem'){
    problem.pp(argv.names, p++, data);
  }
})

var server = app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  var chalk=require('chalk');

  var violet=chalk.rgb(153, 51, 255)('o ');
  var indigo=chalk.bold.rgb(63, 0, 255)('o ');
  var blue=chalk.bold.rgb(102, 153, 255)('o ');
  var green=chalk.bold.rgb(0, 230, 0)('o ');
  var yellow=chalk.bold.rgb(255, 255, 26)('o ');
  var orange=chalk.bold.rgb(255, 165, 0)('o ');
  var red=chalk.bold.rgb(255, 51, 51)('o ');

  console.log(violet+indigo+blue+green+yellow+orange+red+red+orange+yellow+green+blue+indigo+violet);
  if(argv._[0]=='contest') cnt = argv.number;
  else if(argv._[0]=='problem') cnt = argv.names.length;
  else if(argv._[0]=='test') different.diffCal();
});


