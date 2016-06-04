var split = require('split');
var through2 = require('through2');

var index = 1; //it must started with 1,not 0.

process.stdin.pipe(split()).pipe(through2(function(line, _, next){
	var result = line.toString();
	if(index % 2 === 0) {
		result = result.toUpperCase();
	}
	else{
		result = result.toLowerCase();
	}
	this.push(result + '\n')
	index += 1;
	next();
})).pipe(process.stdout).on('end',function(){
	index = 1;
})

// var through2 = require('through2');
// var split = require('split');

// var lineCount = 0;

// var tr = through2(function(buf,_,next){
// 	var line = buf.toString();
// 	this.push(lineCount%2===0
// 		? line.toLowerCase()+'\n'
// 		: line.toUpperCase()+'\n'
// 		);
// 	lineCount ++;
// 	next();
// });

// process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);