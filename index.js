const { PubSub } = require('@google-cloud/pubsub');
const crypto = require('crypto');
const { encryptPayload, decryptPayload, generateKeyPair } = require('./lib/crypto');
const config = require('./lib/config');

const pubsub = new PubSub();

async function publishEncryptedMessage(topicName, messageObj) {
  const messageStr = JSON.stringify(messageObj);
  const encryptedMessage = encryptPayload(messageStr, config.PUBLIC_KEY);

  const dataBuffer = Buffer.from(encryptedMessage, 'base64');
  const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
  console.log(`Published encrypted message: ${messageId}`);
  return messageId;
}

async function subscribeAndDecrypt(subscriptionName, callback) {
  const subscription = pubsub.subscription(subscriptionName);
  subscription.on('message', message => {
    const encrypted = message.data.toString('base64');
    const decrypted = decryptPayload(encrypted, config.PRIVATE_KEY);
    callback(JSON.parse(decrypted));
    message.ack();
  });
}

module.exports = {
  publishEncryptedMessage,
  subscribeAndDecrypt,
  generateKeyPair
};
