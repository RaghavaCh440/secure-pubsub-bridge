const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  return {
    publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
    privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' })
  };
}

function encryptPayload(plainText, publicKey) {
  const buffer = Buffer.from(plainText);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
}

function decryptPayload(encryptedBase64, privateKey) {
  const buffer = Buffer.from(encryptedBase64, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}

module.exports = {
  encryptPayload,
  decryptPayload,
  generateKeyPair
};
