import crypto from 'crypto';
import fs from 'fs';

const keySize = 2048;

crypto.generateKeyPair("rsa", {
  modulusLength: keySize,
  publicKeyEncoding: {
    type: "spki",
    format: "pem"
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem"
  }},
  (err, publicKey, privateKey) => {
    if (err) throw err
    
    fs.writeFileSync("private.pem", privateKey)
  }
)