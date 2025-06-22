# secure-pubsub-bridge

secure-pubsub-bridge is a production-ready Node.js library designed to enhance the security of message-based communication in Google Cloud Pub/Sub environments. It adds a robust end-to-end encryption layer using RSA public-key cryptography, ensuring that sensitive messages can only be decrypted by trusted recipients.

- This makes it ideal for:

- Secure inter-service communication (e.g., between microservices)

- Cross-cloud data exchange

- Zero-trust architectures


## Feature Overview

## 1. Publish Encrypted Messages to Pub/Sub Topics
The library allows developers to securely publish messages to Google Cloud Pub/Sub topics by encrypting the payload using RSA public key cryptography. Instead of sending plain JSON or string messages that could be intercepted or logged in plaintext, secure-pubsub-bridge converts your data into an encrypted Base64 format using the provided public key. This ensures that even if messages are accessed in transit or via misconfigured permissions, they cannot be read without the private key.

## 2. Decrypt Messages Securely on the Subscriber Side
When a message is received by a subscriber, the library automatically decrypts it using the corresponding RSA private key. The decryption is seamless and restores the original JSON object as sent by the publisher. This is critical for maintaining confidentiality and trust across components, especially in multi-tenant or cross-network architectures where message integrity is essential.

## 3. Generate RSA Key Pairs Programmatically
For environments where manual key generation is not ideal, the library includes a utility to generate a fresh RSA key pair programmatically. This is particularly useful in CI/CD pipelines, temporary environments, or development workflows. The keys generated are in PEM format and follow standard RSA-2048 security practices, suitable for secure cloud operations.

## 4. Zero Trust Architecture Compatibility
The library supports architectures that require encrypted communication even within private networks. This aligns with modern zero-trust principles by ensuring every message is validated and secure, regardless of network location or presumed trust boundaries.

## 5. Lightweight and Dependency-Minimal
Aside from the official @google-cloud/pubsub client and dotenv, the library has no heavy dependencies, keeping your deployment fast and container-friendly. It is ideal for serverless environments like Cloud Run, Functions, or Kubernetes with low cold-start tolerance.

## 6. Cloud-Native Integration
Because the library is based on the Google Cloud Pub/Sub SDK, it natively supports IAM roles, service account authentication, and region-specific topic/subscription management. You can plug it into existing Pub/Sub infrastructure with zero reconfiguration.

## 7. Base64 Encoded Message Support
The encrypted payload is encoded in Base64 to ensure compatibility with GCP Pub/Sub binary-safe message transmission. This avoids issues with non-UTF-8 characters or transport encoding restrictions.

## 8. Secure Multi-Service Communication
Whether you’re triggering ML models, synchronizing services, or forwarding alerts, this library ensures that messages exchanged between internal services remain encrypted at all times—preventing data leakage and unauthorized access.

## 9. Configurable Environment Support
Keys are injected via environment variables, making it easy to configure different credentials across environments (dev, staging, prod). This design also supports secret management systems like GCP Secret Manager or Vault.

## 10. Compliance-Ready Design
By enabling encryption at the message layer, secure-pubsub-bridge helps you build workflows that meet the confidentiality and security requirements of standards such as HIPAA, GDPR, and PCI-DSS.



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
