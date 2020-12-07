const app = require('express')();
const bodyParser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');

const port = 10045;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const data = req.body;
  var fileName=data.name[0];

  console.log('Parsing problem(s) from ' + chalk.underline(data.group));
  fs.mkdir('./contest/'+fileName, {recursive: true}, function(err){
    if(err) console.log(err);
  });

  var nooftest = data.tests.length;
  for(var i=0; i<nooftest; i++){
    var currIn = data.tests[i].input;
    var currOut = data.tests[i].output;
    fs.writeFile('./contest/' +data.name[0]+ '/' + 'in'+i, currIn, function(err){
      if(err) console.log(err);
    })
    fs.writeFile('./contest/' +data.name[0]+ '/' + 'out'+i, currOut, function(err){
      if(err) console.log(err);
    })
  }
  console.log(chalk.green.bold('✔️ Parsed Problem '+fileName)); 

  res.sendStatus(200);
});

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(chalk.cyan('Start Parsing...\n'));
});
