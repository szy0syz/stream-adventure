var spwan = require('child_process').spwan;
var duplexer2 = require('duplexer2');
var tr = require('through2');


module.exports = function(counter){
	var countries = {};

	var duplex = duplexer2(tr.obj(function(obj,encoding,done){
		if(obj.country in countries){
			countries[obj.country]++;
		}
		else{
			countries[obj.country] = 1;
		}
		done();
	}),counter);

	duplex.on('finish',function(){
		counter.setCounts(countries);
	});
	return duplex;
};


  // var duplexer = require('duplexer2');
  // var through = require('through2').obj;

  // module.exports = function (counter) {
  //     var counts = {};
  //     var input = through(write, end);
  //     return duplexer({objectMode: true}, input, counter);

  //     function write (row, _, next) {
  //         counts[row.country] = (counts[row.country] || 0) + 1;
  //         next();
  //     }
  //     function end (done) {
  //         counter.setCounts(counts);
  //         done();
  //     }
  // };