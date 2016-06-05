var trumpet = require('trumpet');
var through = require('through2');

var tru = trumpet();

var tr = through(function(buf,_,next){
	this.push(buf.toString().toUpperCase());
	next();
})

process.stdin.pipe(tru);

var stream = tru.select('.loud').createStream();

stream.pipe(tr).pipe(process.stdout);