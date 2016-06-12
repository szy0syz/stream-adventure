//解密！
var crypto = require('crypto');
//                创建一个解密对象，解密方法，秘钥
var stream = crypto.createDecipher('aes256',process.argv[2]);

// 将输入流pipe到解密方法流
process.stdin.pipe(stream);
// 再把加密方法流pipe到输出流
stream.pipe(process.stdout);

//oh shit, WTk 'stream-adventure verify program13.js'!