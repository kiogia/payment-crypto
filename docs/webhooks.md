# Webhook

```js
const payment = new PaymentCrypto('CRYPTO_PAY_TOKEN', {
  webhook: {
    path: 'domain.com/your_secret_path',
  },
});

bot.on('invoice_paid', (update) => {
  console.log(`You got ${update.amount} ${update.asset}!`);
});
```
