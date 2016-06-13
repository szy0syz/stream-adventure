// //本题会从stdin里pipe一个tar压缩包，打印tar里每一个文件的md5值，格式是“filename MD5”。
// var crypto = require('crypto');
// var tar = require('tar');
// var parser = tar.Parse();
// var through = require('through');

// var handler = through(write,end);

// function write(buf){

// }

// function end(){

// }

// //原来entry里的e也是一个stream！！！
// parser.on('entry',function(e){
// 	//过滤掉文件夹，但此方法不可能，有没有isdir属性？找到了：type
// 	// if(e.size >0){
// 	// 	console.log(e.path);
// 	// }

// 	//这种写不怎么好。
// 	// if(e.type == 'File' ){
// 	// 	console.log(e);
// 	// }

// 	//这种写比较简单易懂！
// 	if(e.type !== 'File') return;

// 	//h也是一个stream！！
// 	var h = crypto.createHash('md5',{encoding:'hex'});
// 	e.pipe(h)

// 		// try{
// 		// 	const hash = crypto.createHash('md5');
// 		// 	const input = fs.createReadStream(e.path);
// 		// 	input.on('readable', () => {
// 	 //  		var data = input.read();
// 	 //  		if (data)
// 	 //    	hash.update(data);
// 	 // 		else {
// 	 //    	console.log(`${hash.digest('hex')} ${filename}`);
// 	 //  		}
// 		// 	});
// 		// }catch(e){
// 		// 	console.error(e);
// 		// }

	
// });

// var fs = require('fs');
// fs.createReadStream('1234.tar').pipe(parser);
// //fs.createReadStream(process.argv[2]).pipe(parser);



var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var concat = require('concat-stream');

var parser = tar.Parse();
parser.on('entry',function(e){
	if(e.type !== 'File') return;

	var h = crypto.createHash('md5',{encoding:'hex'});
	e.pipe(h).pipe(concat(function(hash){
		console.log(hash + ' ' + e.path);
	}));
});

var cipher = process.argv[2];
var pw = process.argv[3];

process.stdin
	.pipe(crypto.createDecipher(cipher,pw))
	.pipe(zlib.createGunzip())
	.pipe(parser)
;