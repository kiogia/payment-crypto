# [![Payment Crypto][14]][12]

## Introduction

This simple module is based on [Crypto Pay API][3] for easy use.

[Crypto Pay][3] is a payment system based on [Crypto Bot][4] that allows you to accept payments in crypto and transfer coins to users using this module.

## Installation

Installation from `npm`

```sh
npm i payment-crypto
```

Installation from `yarn` in the future

## Setup

### Importing

**CommonJS**. For the use of `async` functions in the main scope, try this:

```js
const PaymentCrypto = require('payment-crypto');
(async () => {
  // async functions
})();
```

**ES6**. Supports the use of `async` functions in main scope:

```js
import PaymentCrypto from 'payment-crypto';
// async functions
```

To use ES6, add to `package.json`:

```json
"type": "module"
```

### Authorization

First, you need to create a new app and get API token. Open [@CryptoBot][1], go to [Crypto Pay][3] and tap **Create App** to get API Token.

```js
const token = '1234:TOKEN'; // replace with your token
const payment = new PaymentCrypto(token);
```

### Authorization in testnet

Getting testnet token is similar to the [mainnet](#authorization). Open [@CryptoTestnetBot][2], go to [Crypto Pay][4] and tap **Create App** to get API Token.

```js
const token = '1234:TOKEN'; // replace with your testnet token
const payment = new PaymentCrypto(token, {
  mode: 'testnet',
});
```

### Example

This is a small **ES6** example with which you can easily start using [payment-crypto][12].

```js
import PaymentCrypto from 'payment-crypto';
const token = '1234:TOKEN'; // replace with your testnet token
const payment = new PaymentCrypto(token, {
  mode: 'testnet',
});

const me = await payment.getMe();
console.log(me);
```

> You can find more examples [here][16].

## Useful links

- [Documentation][15]
- [Examples][16]
- [Official reference][11]
- [crypto-pay-api by Foile][13]
- `payment-crypto`
  - [News channel][9]
  - [Discussion chat][10]
- Crypto Pay news channel
  - [English][5]
  - [Russian][6]
- Crypto Pay discussion chat
  - [English][7]
  - [Russian][8]

[1]: https://t.me/CryptoBot
[2]: https://t.me/CryptoTestnetBot
[3]: https://t.me/CryptoBot?start=pay
[4]: https://t.me/CryptoTestnetBot?start=pay
[5]: https://t.me/CryptoBotEN
[6]: https://t.me/CryptoBotRU
[7]: https://t.me/CryptoPayDev
[8]: https://t.me/CryptoPayDevRU
[9]: https://t.me/KioDev
[10]: https://t.me/KioDevChat
[11]: https://help.crypt.bot/crypto-pay-api
[12]: https://npmjs.com/package/payment-crypto
[13]: https://npmjs.com/package/@foile/crypto-pay-api
[14]: https://i.imgur.com/EJQ5EKK.png
[15]: https://kiogia.github.io/payment-crypto/
[16]: https://kiogia.github.io/payment-crypto/classes/payment_crypto.default
