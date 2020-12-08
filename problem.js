const express = require('express');
const chalk = require('chalk');
var fs = require('file-system');
var router = express.Router();
const yargs = require('yargs')

function parseProblem(arr, pointer, data){

  fs.mkdir(process.cwd()+'/contest/'+arr[pointer], {recursive: true}, function(err){
    if(err) console.log(err);
  });

  var nooftest = data.tests.length;
  for(var i=0; i<nooftest; i++){
    var currIn = data.tests[i].input;
    var currOut = data.tests[i].output;
    fs.writeFile(process.cwd()+'/contest/' +arr[pointer]+ '/' + 'in'+i+1, currIn, function(err){
      if(err) console.log(err);
    })
    fs.writeFile(process.cwd()+'/contest/' +arr[pointer]+ '/' + 'out'+i+1, currOut, function(err){
      if(err) console.log(err);
    })
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+chalk.underline(data.name))); 

  if(pointer+1==arr.length){
    console.log('🦄'+ chalk.yellow(' Parse successful'));
    process.exit(1);
  }
}

function parseContest(curr, total, data){

  fs.mkdir(process.cwd()+'/contest/'+String.fromCharCode(65+curr), {recursive: true}, function(err){
    if(err) console.log(err);
  });

  var nooftest = data.tests.length;
  for(var i=0; i<nooftest; i++){
    var currIn = data.tests[i].input;
    var currOut = data.tests[i].output;
    fs.writeFile(process.cwd()+'/contest/' +String.fromCharCode(65+curr)+ '/' + 'in'+i+1, currIn, function(err){
      if(err) console.log(err);
    })
    fs.writeFile(process.cwd()+'/contest/' +String.fromCharCode(65+curr)+ '/' + 'out'+i+1, currOut, function(err){
      if(err) console.log(err);
    })
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+chalk.underline(data.name))); 

  if(curr+1==total){
    console.log('🦄'+ chalk.yellow(' Parse successful'));
    process.exit(1);
  } 
}
module.exports = {pp: parseProblem, pc: parseContest};

