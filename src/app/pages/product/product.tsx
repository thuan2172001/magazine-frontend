import React from 'react';

const {randomBytes} = require('crypto')
const secp256k1 = require('secp256k1')

function Product(props: any) {

// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node

// generate message to sign
// message should have 32-byte length, if you have some other length you can hash message
// for example `msg = sha256(rawMessage)`
  const msg = randomBytes(32)

// generate privKey
  let privKey
  do {
    privKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
  const pubKey = secp256k1.publicKeyCreate(privKey)

// sign the message
  const sigObj = secp256k1.ecdsaSign(msg, privKey)

// verify the signature
  console.log(privKey)
// => true
  return (
    <div>
      this is product page
    </div>
  );
}

export default Product;