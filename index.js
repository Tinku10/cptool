const app = require('express')();
const bodyParser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');
var problem = require('./problem.js')

const port = 10045;
app.use(bodyParser.json());
app.use('/', problem);


var server = app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(chalk.yellow('Start Parsing...'));
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('🦄'+ chalk.yellow(' Parse successful'));
  })
})
