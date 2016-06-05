// var http = require('http')
// var concat = require('concat-stream')

// var server = http.createServer(function(req,res){
// 	if (req.method === "GET") {
// 		req.pipe(concat(function(body){
// 			var obj = JSON.parse(body);
// 			res.end(Object.keys(obj).join('\n'));
// 		}))
// 	}
// 	else{
// 		res.end();
// 	}
// })
// server.listen(5000)
var concat = require('concat-stream');

process.stdin.pipe(concat(function(body){
	console.log(body.reverse().toString())
}))


// var concat = require('concat-stream');
//   process.stdin.pipe(concat(function (src) {
//         var s = src.toString().split('').reverse().join('');      
//         console.log(s);  
//     }));