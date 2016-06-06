var trumpet = require('trumpet');
var through = require('through2');
 
var tru = trumpet();
 
var tr = through(function(buf,_,next){
    this.push(buf.toString().toUpperCase()+ '</span>');
    next();
})
 
process.stdin.pipe(tru);
 
var writeStream = tru.select('.loud').createWriteStream();
var readStram = tru.select('.loud').createReadStream();
 
readStram.pipe(tr).pipe(writeStream);
 
tru.pipe(process.stdout);



  // var trumpet = require('trumpet');
  // var through = require('through2');
  // var tr = trumpet();
 
  // var loud = tr.select('.loud').createStream();
  // loud.pipe(through(function (buf, _, next) {
  //     this.push(buf.toString().toUpperCase());
  //     next();
  // })).pipe(loud);
 
  // process.stdin.pipe(tr).pipe(process.stdout);
