const app = require('express')();
const bodyparser = require('body-parser');
const chalk = require('chalk');
var fs = require('file-system');
var execsync = require('child_process').execsync;

const dir=process.cwd();
const chars = dir.split('/');
var filename = chars[chars.length-1];

module.exports = {
  diffCal: ()=>{
    fs.readdir(dir, (err, files) => {
      var len=files.length;
      var passed=0;
      for(var i=1;i<=(len-1)/2;i++){ 
        execSync("g++ -std=c++17 "+fileName+".cpp -o "+fileName +"&& ./" +fileName+ " < in"+i+" > ans");
        var ans=fs.readFileSync(dir+"/out"+i,{encoding:'utf8', flag:'r'});
        var actualans=fs.readFileSync(dir+"/ans",{encoding:'utf8', flag:'r'});
        var out=actualans.split("\n");
        var exp=ans.split("\n");
        while(out[out.length-1]=='') out.pop();
        while(exp[exp.length-1]=='') exp.pop();
        for(var str of out)str.trim();
        for(var str of exp)str.trim();
        var diffs=0;
        for(var lines=0;lines<exp.length;lines++){
          if(lines<out.length){
            if(out[lines]!=exp[lines]){
              diffs++;
            }
          }
          else diffs++;
        }
        if(!diffs){
          console.log(chalk.green.bold("Test Case " + i +" Passed .."));
          passed++;
        }
        else {
          console.log(chalk.red.bold("Failed Test Case "+i));
          console.log(chalk.underline("OUTPUT"));
          console.log(chalk.yellowBright(ans));
          console.log(chalk.underline("EXPECTED"));
          for(var lines=0;lines<exp.length;lines++){
            if(lines<out.length){
              if(out[lines]!=exp[lines])console.log(chalk.red(exp[lines]));
              else console.log(chalk.green(out[lines]));
            }
            else{
              console.log(chalk.red(exp[lines]));
            }
          }
        }
        execSync("rm -f " +dir+"/"+fileName);
        execSync("rm -f " +dir+"/"+"ans");
      }
      console.log(chalk.magenta(passed+"/"+(i-1)+" Passed"));
      process.exit(1);
    });
  }
}
