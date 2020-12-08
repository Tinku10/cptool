const express = require('express');
const chalk = require('chalk');
var fs = require('file-system');
var router = express.Router();
const yargs = require('yargs')

function parseProblem(arr, pointer, data){
  fs.mkdirSync(process.cwd()+"/contest");
  var nooftest = data.tests.length;
  for(var i=1; i<=nooftest; i++){
    var currIn = data.tests[i-1].input;
    var currOut = data.tests[i-1].output;
    fs.writeFileSync(process.cwd()+'/contest/' +arr[pointer]+ '/' + 'in'+i,currIn);
    fs.writeFileSync(process.cwd()+'/contest/' +arr[pointer]+ '/' + 'out'+i,currOut);
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+chalk.underline(data.name))); 

  if(pointer+1==arr.length){
    console.log('🦄'+ chalk.yellow(' Parse successful'));
    process.exit(1);
  }
}

function parseContest(curr, total, data){

  fs.mkdirSync(process.cwd()+'/contest/'+String.fromCharCode(65+curr));

  var nooftest = data.tests.length;
  for(var i=1; i<=nooftest; i++){
    var currIn = data.tests[i-1].input;
    var currOut = data.tests[i-1].output;
    fs.writeFileSync(process.cwd()+'/contest/' +String.fromCharCode(65+curr)+ '/' + 'in'+i, currIn);
    fs.writeFileSync(process.cwd()+'/contest/' +String.fromCharCode(65+curr)+ '/' + 'out'+i, currOut);
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+chalk.underline(data.name))); 

  if(curr+1==total){
    console.log('🦄'+ chalk.yellow(' Parse successful'));
    process.exit(1);
  } 
}
module.exports = {pp: parseProblem, pc: parseContest};

