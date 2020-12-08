const express = require('express');
const chalk = require('chalk');
var fs = require('file-system');
var router = express.Router();
var diff = require('diff');

function compare(){
  console.log('hello');
  var len;
  var inputs = [], outputs = [];
  fs.readdir(process.cwd(), (err, files)=>{
    len = files.length;
    for(var file of files){
      if(file.includes('in')) inputs.push(file);
      else outputs.push(file);
    }
  });
  for(var o of outputs){
    var actualans;
    fs.readFile(process.cwd()+o, (err, data)=>{
      if(err) console.log(err);
      actualans = data;
    });
    var ansgot;
    fs.readFile(process.cwd()+'/ans', (err, data)=>{
      if(err) console.log(err);
      ansgot = data;
    });
    diff.diffchars(actualans, ansgot);
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    process.stderr.write(part.value[color]);
  }
}

module.exports = {compare: compare};
