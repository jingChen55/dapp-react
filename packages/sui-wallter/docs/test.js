import Base64 from 'js-base64';
// const Base64 = require( 'js-base64' );

function test() {
  console.log( '解码：' + Base64.decode( 'MDRjZmIzOWIyZWFlZTc4NmU2MjBhOGE0Yzg2MTI3OTYzOWFiM2QzYTEwYWZkNGIyNzVkMTU1MThmMDViZTFmMQ==' ) )
};

test();