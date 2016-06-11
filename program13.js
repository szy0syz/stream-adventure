////my ans:
// var combine = require('stream-combiner');
// var split = require('split');
// var zlib = require('zlib');
// var through = require('through');

// module.exports = function()
//         {
//             var current;
//             var grouper = through(write, end);

//             function write(buf)
//             {
//              //判断是否为空	
//             	if(buf){
//             		var row = JSON.parse(buf.toString())

// 	                if(row.type == 'genre')
// 	                {
// 	                    if(current)
// 	                        this.push(JSON.stringify(current)+'\n');
// 	                    current={name: row.name, books: [] };
// 	                }
// 	                else if(row.type =='book')
// 	                {
// 	                    current.books.push(row.name);
// 	                }
//             	}               
//             }

//             function end() { 
//                     if(current)

//                         this.push(JSON.stringify(current)+'\n');
//                     this.push(null);
//             }
			   //		    =stdin.pipe(split()).pipe(grouper).pipe(zlib.createGzip())
//             return combine(split(), grouper, zlib.createGzip());
//         };


////std ans:
var combine = require('stream-combiner');
  var through = require('through2');
  var split = require('split');
  var zlib = require('zlib');

  module.exports = function () {
      var grouper = through(write, end);
      var current;

      function write (line, _, next) {
      	  // 这里判断line是否为空,为空就next()！
          if (line.length === 0) return next();
          var row = JSON.parse(line);

          if (row.type === 'genre') {
          	  //如果current不为空，且当前obj又是一个新denre，先push再new！
              if (current) {
                  this.push(JSON.stringify(current) + '\n');
              }
              current = { name: row.name, books: [] };
          }
          else if (row.type === 'book') {
              current.books.push(row.name);
          }
          next();
      }
      function end (next) {
      	  //在end事件中，因raw最后一个obj是null，在write函数中还未push，故..
          if (current) {
              this.push(JSON.stringify(current) + '\n');
          }
          next();
      }

      //          =stdin.pipe(split()).pipe(grouper).pipe(zlib.createGzip())
      return combine(split(), grouper, zlib.createGzip());
  };


//RAW:在data中，处理到倒数第二个obj时，此时因为倒数第一个是null，故需要在end中处理未尽事宜！
// _buf: {"type":"genre","name":"apocalypse"}
// _buf: {"type":"book","name":"Alas, Babylon"}
// _buf: {"type":"book","name":"Earth Abides"}
// _buf: {"type":"book","name":"Riddley Walker"}
// _buf: {"type":"genre","name":"cyberpunk"}
// _buf: {"type":"book","name":"Snow Crash"}
// _buf: {"type":"book","name":"Accelerando"}
// _buf: {"type":"book","name":"The Diamond Age"}
// _buf: {"type":"book","name":"Neuromancer"}
// _buf: {"type":"book","name":"Heavy Weather"}
// _buf: {"type":"genre","name":"new wave"}
// _buf: {"type":"book","name":"Bug Jack Barron"}
// _buf: {"type":"book","name":"Dangerous Visions"}
// _buf: {"type":"book","name":"The Heat Death of the Universe"}
// _buf: {"type":"genre","name":"time travel"}
// _buf: {"type":"book","name":"The Time Machine"}
// _buf: {"type":"book","name":"A Connecticut Yankee in King Arthur's Court"}
// _buf: {"type":"genre","name":"alternate history"}
// _buf: {"type":"book","name":"The Man in the High Castle"}
// _buf: {"type":"book","name":"Bring the Jubilee"}
// _buf: {"type":"genre","name":"space opera"}
// _buf: {"type":"book","name":"Void"}
// _buf: {"type":"book","name":"A Deepness in the Sky"}
// _buf: {"type":"book","name":"Skylark"}
// _buf: