const express = require('express');
const chalk = require('chalk');
var fs = require('file-system');
var router = express.Router();
const yargs = require('yargs')
var argv = yargs
  .help()
  .alias("contest", "c")
  .alias("problem", "p")
  .argv

var cnt = 0;
var p = argv.problem; var c = argv.contest;
if(p) cnt = argv._.length;
else cnt = argv._[0];
var arr = argv._; var curr = 'A'; var pointer = 0;

router.post('/', (req, res) => {
  const data = req.body;

  fs.mkdir('./contest/'+(p? arr[pointer]: curr), {recursive: true}, function(err){
    if(err) console.log(err);
  });

  var nooftest = data.tests.length;
  for(var i=0; i<nooftest; i++){
    var currIn = data.tests[i].input;
    var currOut = data.tests[i].output;
    fs.writeFile('./contest/' +(p? arr[pointer]: curr)+ '/' + 'in'+i, currIn, function(err){
      if(err) console.log(err);
    })
    fs.writeFile('./contest/' +(p? arr[pointer]: curr)+ '/' + 'out'+i, currOut, function(err){
      if(err) console.log(err);
    })
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+chalk.underline(data.name))); 
  if(p) pointer++;
  else String.fromCharCode(curr.charCodeAt()+1);

  res.sendStatus(200);
  if(--cnt==0) process.kill(process.pid, 'SIGTERM');
});

module.exports = router;
