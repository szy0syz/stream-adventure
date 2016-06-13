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


// 一个被加密、被压缩的tar文件将用pipe传输到process.stdin中；
// 打印出tar包中文件的hash值+' '+path+filename+ '\n'
var crypto = require('crypto');
var tar = require('tar');
// This provides bindings to Gzip/Gunzip, Deflate/Inflate, and DeflateRaw/InflateRaw classes. 
//   Each class takes the same options, and is a readable/writable Stream.
var zlib = require('zlib');
var concat = require('concat-stream');

//               Parse - 一定要大写！
var parser = tar.Parse();

//e=object，is a sttream too！！！
parser.on('entry',function(e){
	//这种写法比较好！不要写一堆code大括号包起！！
	if(e.type !== 'File') return;

	var h = crypto.createHash('md5',{encoding:'hex'});
	e.pipe(h).pipe(concat(function(hash){
		console.log(hash + ' ' + e.path);
	}));
});

//加密方式
var cipher = process.argv[2];
//密匙
var pw = process.argv[3];

process.stdin
	//No.1 解密
	.pipe(crypto.createDecipher(cipher,pw))
	//No.2 解压
	.pipe(zlib.createGunzip())
	//No.3 tar格式打开该流
	.pipe(parser)
;