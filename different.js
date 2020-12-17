require('colors');
const app = require('express')();
const bodyParser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');
var execSync = require('child_process').execSync;

const dir=process.cwd();
const chars = dir.split('/');
var fileName = chars[chars.length-1];
const Diff = require('diff');
 

module.exports = {
  diffCal: ()=>{
    fs.readdir(dir, (err, files) => {
 
      var passed=0;
      try{
        execSync("g++ -std=c++17 "+fileName+".cpp -o "+fileName);
      }catch(err){
        console.log(err.stdout);
        console.log(chalk.red(err.stderr));
        process.exit(1);
      }
      var len=files.length;
      for(var i=1;i<=(len-1)/2;i++){ 
        try{
          execSync("./" +fileName+ " < in"+i+" > ans");
        }catch(err){
          console.log(chalk.red(err.stdout));
          process.exit(1);
        }
        var ans=fs.readFileSync(dir+"/out"+i,{encoding:'utf8', flag:'r'});
        var actualans=fs.readFileSync(dir+"/ans",{encoding:'utf8', flag:'r'});
        var diff = Diff.diffWords(actualans, ans, {newlineIsToken: true});
        var cnt = 0;
        diff.forEach((part) => {
          // green for additions, red for deletions
          // grey for common parts
          const color = part.added ? 'brightGreen' :
            part.removed ? 'brightRed' : 'gray';
          process.stderr.write(part.value[color]);
          if(part.removed || part.added) cnt++;
        });
        // console.log();
        if(cnt==0){
          console.log(chalk.green.bold('Passed Pretest '+ i))
          passed++;
        }
        else{
          console.log(chalk.red.bold('Failed Pretest '+ i))
        }
        console.log();
        execSync("rm -f " +dir+"/"+"ans");
      }
      console.log(chalk.bold.magenta(passed+"/"+(i-1)+ " " + chalk.underline.green.bold("Passed")));
      process.exit(1);
    });
  }
}
