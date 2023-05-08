import * as Base64 from 'js-base64';
// const Base64 = require( 'js-base64' );

/**
 * The function decodes a Base64 encoded string and logs the result to the console.
 */
function test() {
  console.log( '解码：' + Base64.decode( 'MDRjZmIzOWIyZWFlZTc4NmU2MjBhOGE0Yzg2MTI3OTYzOWFiM2QzYTEwYWZkNGIyNzVkMTU1MThmMDViZTFmMQ==' ) )
};

test();

//04cfb39b2eaee786e620a8a4c861279639ab3d3a10afd4b275d15518f05be1f1