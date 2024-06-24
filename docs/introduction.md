# [![Payment Crypto][6]][5]

## Introduction

This simple module is based on [Crypto Pay API][3] for easy use.

[Crypto Pay][3] is a payment system based on [Crypto Bot][4] that allows you to accept payments in crypto and transfer coins to users using this module.

## Installation

::: code-group

```sh [npm]
npm i payment-crypto
```

```sh [yarn]
# in future
```

:::

## Setup

### Importing

::: code-group

```js [CommonJS]
// CommonJS. For the use of async functions in the main scope, try this:

const PaymentCrypto = require('payment-crypto');
(async () => {
  // async functions
})();
```

```js [ES6]
// ES6. Supports the use of async functions in main scope, try this:

import PaymentCrypto from 'payment-crypto';
// async functions
```

:::

::: tip

To use ES6, add to `package.json`:

```json
"type": "module"
```

:::

### Authorization

First, you need to create a new app and get API token. Open [@CryptoBot][1], go to [Crypto Pay][3] and tap **Create App** to get API Token.

Getting testnet token is similar to the mainnet. Open [@CryptoTestnetBot][2], go to [Crypto Pay][4] and tap **Create App** to get API Token.

::: code-group

```js [Mainnet]
const token = '1234:TOKEN'; // replace with your token
const payment = new PaymentCrypto(token);
```

```js [Testnet]
const token = '1234:TOKEN'; // replace with your testnet token
const payment = new PaymentCrypto(token, {
  mode: 'testnet',
});
```

:::

## Example

This is a small **ES6** example with which you can easily start using [payment-crypto][5].

```js
import PaymentCrypto from 'payment-crypto';
const token = '1234:TOKEN'; // replace with your testnet token
const payment = new PaymentCrypto(token, {
  mode: 'testnet',
});

const me = await payment.getMe();
console.log(me);
```

> You can find more examples [here](./examples).

[1]: https://t.me/CryptoBot
[2]: https://t.me/CryptoTestnetBot
[3]: https://t.me/CryptoBot?start=pay
[4]: https://t.me/CryptoTestnetBot?start=pay
[5]: https://npmjs.com/package/payment-crypto
[6]: https://i.imgur.com/EJQ5EKK.png
