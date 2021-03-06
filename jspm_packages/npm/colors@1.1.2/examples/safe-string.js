/* */ 
var colors = require("../safe");
console.log(colors.yellow("First some yellow text"));
console.log(colors.yellow.underline("Underline that text"));
console.log(colors.red.bold("Make it bold and red"));
console.log(colors.rainbow("Double Raindows All Day Long"));
console.log(colors.trap("Drop the bass"));
console.log(colors.rainbow(colors.trap("DROP THE RAINBOW BASS")));
console.log(colors.bold.italic.underline.red('Chains are also cool.'));
console.log(colors.green('So ') + colors.underline('are') + ' ' + colors.inverse('inverse') + colors.yellow.bold(' styles! '));
console.log(colors.zebra("Zebras are so fun!"));
console.log("This is " + colors.strikethrough("not") + " fun.");
console.log(colors.black.bgWhite('Background color attack!'));
console.log(colors.random('Use random styles on everything!'));
console.log(colors.america('America, Heck Yeah!'));
console.log('Setting themes is useful');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
console.log(colors.error("this is an error"));
console.log(colors.warn("this is a warning"));
console.log(colors.input("this is an input"));
colors.setTheme(__dirname + '/../themes/generic-logging.js');
console.log(colors.error("this is an error"));
console.log(colors.warn("this is a warning"));
console.log(colors.input("this is an input"));
