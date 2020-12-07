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

var cnt = 0; var p = argv.problem; var c = argv.contest; var arr = argv._; var curr = 65; var pointer = 0;

if(p) cnt = argv._.length;
else cnt = argv._[0];

router.post('/', (req, res) => {
  const data = req.body;
  console.log(process.cwd());

  fs.mkdir(process.cwd()+'/contest/'+(p? arr[pointer]: String.fromCharCode(curr)), {recursive: true}, function(err){
    if(err) console.log(err);
  });

  var nooftest = data.tests.length;
  for(var i=0; i<nooftest; i++){
    var currIn = data.tests[i].input;
    var currOut = data.tests[i].output;
    fs.writeFile(process.cwd()+'/contest/' +(p? arr[pointer]: String.fromCharCode(curr))+ '/' + 'in'+i, currIn, function(err){
      if(err) console.log(err);
    })
    fs.writeFile(process.cwd()+'/contest/' +(p? arr[pointer]: String.fromCharCode(curr))+ '/' + 'out'+i, currOut, function(err){
      if(err) console.log(err);
    })
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+chalk.underline(data.name))); 

  curr++;
  if(p) pointer++;
  if(--cnt==0){
    console.log('🦄'+ chalk.yellow(' Parse successful'));
    process.exit(1);
  } 
  res.sendStatus(200);
});

module.exports = router;
