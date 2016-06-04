var through = require('through2');

function write(buffer, encoding, next){
	this.push(buffer.toString().toUpperCase());
	next();
}

function end(){
	//console.log('done_' + Date.now())
}

var stream = through(write,end);

 process.stdin.pipe(stream).pipe(process.stdout)