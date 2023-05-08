/**
 * encrypt & decrypt
 */
import crypto from 'crypto';

// 对称加密算法：aes128，秘钥要求16位
const algorithm = 'aes128';
// 示例秘钥
const key = '';

// AES 加密
function aesEncrypt( message, key ) {
  const cipher = crypto.createCipheriv( algorithm, key, key );
  let crypted = cipher.update( message, 'utf8', 'hex' );
  crypted += cipher.final( 'hex' );
  return crypted;
}

// AES 解密
function aesDecrypt( text, key ) {
  const cipher = crypto.createDecipheriv( algorithm, key, key );
  let decrypted = cipher.update( text, 'hex', 'utf8' );
  decrypted += cipher.final( 'utf8' );
  return decrypted;
}

//private_key encrypt
export function privateKeyEncrypt( originalPrivateKey, key ) {
  let length = originalPrivateKey.length;
  let keyCharacter = originalPrivateKey.substring( length - 1, length );
  keyCharacter = String.fromCharCode( keyCharacter.charCodeAt() + 1 );
  let waitingEncryptPrivateKey = originalPrivateKey.substring( 0, length - 1 ) + keyCharacter;
  return aesEncrypt( waitingEncryptPrivateKey, key );
}

//private_key decrypt
export function privateKeyDecrypt( encryptedPrivateKey, key ) {
  let decryptedPrivateKey = aesDecrypt( encryptedPrivateKey, key );
  let length = decryptedPrivateKey.length;
  let keyCharacter = decryptedPrivateKey.substring( length - 1, length );
  keyCharacter = String.fromCharCode( keyCharacter.charCodeAt() - 1 );
  return decryptedPrivateKey.substring( 0, length - 1 ) + keyCharacter;
}