# secure-pubsub-bridge

A lightweight Node.js library for encrypting and securely transmitting Google Cloud Pub/Sub messages using RSA encryption. Ideal for secure inter-service or inter-cloud message delivery.

##  Features
- Publish encrypted messages to Pub/Sub topics
- Decrypt messages securely on the subscriber side
- Generate RSA key pairs

##  Installation
```bash
npm install secure-pubsub-bridge
```

##  Usage
### 1. Generate Keys
```js
const { generateKeyPair } = require('secure-pubsub-bridge');
const keys = generateKeyPair();
console.log(keys.publicKey, keys.privateKey);
```

### 2. Publish Encrypted Message
```js
const { publishEncryptedMessage } = require('secure-pubsub-bridge');
await publishEncryptedMessage('my-topic', { secret: 'data' });
```

### 3. Subscribe and Decrypt
```js
const { subscribeAndDecrypt } = require('secure-pubsub-bridge');
subscribeAndDecrypt('my-subscription', data => {
  console.log('', data);
});
```

##  Environment Variables
```env
PUBLIC_KEY="<Your PEM formatted RSA Public Key>"
PRIVATE_KEY="<Your PEM formatted RSA Private Key>"
```

##  License
MIT

---

// secure-pubsub-bridge/LICENSE

MIT License

Copyright (c) 2025 Raghava Chellu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
