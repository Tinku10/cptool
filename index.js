#!/usr/bin/env node

const app = require('express')();
const bodyParser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');
var problem = require('./problem.js')
var diff = require('./diff.js')
const yargs = require('yargs')

var argv = yargs
  .command('contest <number>', 'fetch data from a contest')
  .command('problem [names...]', 'fetch the list of problems')
  .command('test', 'runs the code against outputs')
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

  console.log(chalk.yellow('Server Started 🕒'));
  if(argv._[0]=='contest') cnt = argv.number;
  else if(argv._[0]=='problem') cnt = argv.names.length;
  else if(argv._[0]=='test') diff.diffCal();
});


