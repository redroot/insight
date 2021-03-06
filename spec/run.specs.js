require.paths.unshift('spec', 'lib', 'src');
var jasmine = require('jasmine');
var sys = require('sys');

for(var key in jasmine) {
  global[key] = jasmine[key];
}

var isVerbose = false;
var showColors = true;
process.argv.forEach(function(arg){
  switch(arg) {
  case '--color': showColors = true; break;
  case '--noColor': showColors = false; break;
  case '--verbose': isVerbose = true; break;
  }
});

jasmine.executeSpecsInFolder(__dirname, function(runner, log){
  process.exit(runner.results().failedCount);
}, isVerbose, showColors);
