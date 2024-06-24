# Functions

## callApi

Interface representing a method to call an API with optional parameters.

```js
const appInfo = await payment.callApi('getMe', {});
console.log(appInfo);
```

| Field    | Type     | Description                           |
| -------- | -------- | ------------------------------------- |
| `method` | `string` | The API method to be called.          |
| `params` | `Object` | Optional parameters for the API call. |

Returns `Promise` with `Object` or `Array`

## on

Receiving updates.

```js
bot.on('invoice_paid', (update) => {
  console.log(`You got ${update.amount} ${update.asset}!`);
});
```

| Field        | Type                        | Description                                          |
| ------------ | --------------------------- | ---------------------------------------------------- |
| `updateType` | [`UpdateType`](./types.md#) | The type of update received.                         |
| `callback`   | `Function`                  | A function that is executed when an update received. |

Returns `void`

## getMe

Use this method to test your app's authentication token and get basic information about an app.

```js
const appInfo = await payment.getMe();
console.log(appInfo);
```

Returns `Promise` with `AppInfo`

## getStats

Use this method to get app statistics.

```js
const appStats = await payment.getStats();
console.log(appStats);
```

| Field     | Type              | Description                  |
| --------- | ----------------- | ---------------------------- |
| `options` | `GetStatsOptions` | Additional optional options. |

Returns `Promise` with `AppStats`

## createInvoice

Use this method to create a new invoice.

::: code-group

```js [Crypto]
const invoice = await payment.createInvoice({
  amount: 3,
  asset: 'TON',
});
console.log(`Payment link ${invoice.bot_invoice_url}`);
```

```js [Fiat]
const invoice = await payment.createInvoice({
  currency_type: 'fiat',
  amount: 5,
  asset: 'USD',
});
console.log(`Payment link ${invoice.bot_invoice_url}`);
```

:::

| Field      | Type                     | Description                   |
| ---------- | ------------------------ | ----------------------------- |
| `currency` | `InvoiceCurrencyOptions` | Required invoice information. |
| `options?` | `CreateInvoiceOptions`   | Additional optional options.  |

Returns `Promise` with `Invoice`

## deleteInvoice

Use this method to delete invoices created by your app.

```js
await payment.deleteInvoice(12345);
```

| Field        | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `invoice_id` | `number` | Invoice ID to be deleted. |

Returns `Promise` with `true`

## createCheck

Use this method to create a new check.

| Field     | Type                        | Description                     |
| --------- | --------------------------- | ------------------------------- |
| `asset`   | [`Asset`](./types.md#Asset) | Cryptocurrency alphabetic code. |
| `amount`  | `number`                    | Amount of the invoice in float. |
| `options` | `CreateCheckOptions`        | Additional optional options.    |

Returns `Promise` with `Check`

## deleteCheck

Use this method to delete checks created by your app.

```js
await payment.deleteCheck(12345);
```

| Field      | Type     | Description             |
| ---------- | -------- | ----------------------- |
| `check_id` | `number` | Check ID to be deleted. |

Returns `Promise` with `true`

## transfer

Use this method to send coins from your app's balance to a user. This method must first be enabled in the security settings of your app. Open [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet), go to Crypto Pay → My Apps, choose an app, then go to Security -> Transfers... and tap **Enable**.

```js
const spendID = payment.generateSpendID();
await payment.transfer(123456789, 'TON', 5, spendID);
```

| Field      | Type                        | Description                                                                                                                                                                                                                                                                                      |
| ---------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `user_id`  | `number`                    | Telegram user ID. User must have previously used [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet).                                                                                                                                          |
| `asset`    | [`Asset`](./types.md#Asset) | Cryptocurrency alphabetic code.                                                                                                                                                                                                                                                                  |
| `amount`   | `number`                    | Amount of the transfer in float. The minimum and maximum amount limits for each of the supported assets roughly correspond to 1-25000 USD. Use [getExchangeRates](../docs/functions.md#) to convert amounts.                                                                                     |
| `spend_id` | `string`                    | UUID or any random UTF-8 string generated for each transfer to make your request idempotent in cases when it should be retried (for example, request timeout, connection reset,`500`HTTP status, etc). Only one transfer with the same`spend_id`can be accepted from your app. Up to`64`symbols. |
| `options?` | `TransferOptions`           | Additional optional options.                                                                                                                                                                                                                                                                     |

Returns `Promise` with `true`

## generateSpendID

Generates spend ID for transfer.

```js
const spendID = payment.generateSpendID(64);
console.log(spendID);
```

| Field  | Type   | Description              |
| ------ | ------ | ------------------------ |
| length | number | Generated string length. |

Returns `string;`

## getInvoices

Use this method to get invoices created by your app.

```js
const invoices = payment.getInvoices();
console.log(invoices);
```

| Field    | Type               | Description                  |
| -------- | ------------------ | ---------------------------- |
| options? | GetInvoicesOptions | Additional optional options. |

Returns `Promise` with `Invoice[]`

## getInvoice

Use this method to get invoice created by your app.

```js
const invoice = payment.getInvoice(12345);
console.log(invoice);
```

| Field      | Type   | Description  |
| ---------- | ------ | ------------ |
| invoice_id | number | Invoice IDs. |

Returns `Promise` with `Invoice`

## getTransfers

Use this method to get transfers created by your app.

```js
const transfers = payment.getTransfers();
console.log(transfers);
```

| Field    | Type                | Description                  |
| -------- | ------------------- | ---------------------------- |
| options? | GetTransfersOptions | Additional optional options. |

Returns `Promise` with `Transfer[]`

## getTransfer

Use this method to get transfer created by your app.

```js
const transfer = payment.getTransfer(12345);
console.log(transfer);
```

| Field       | Type   | Description   |
| ----------- | ------ | ------------- |
| transfer_id | number | Transfer IDs. |

Returns `Promise` with `Transfer`

## getChecks

Use this method to get checks created by your app.

```js
const checks = payment.getChecks();
console.log(checks);
```

| Field    | Type             | Description                  |
| -------- | ---------------- | ---------------------------- |
| options? | GetChecksOptions | Additional optional options. |

Returns `Promise` with `Check[]`

## getCheck

Use this method to get check created by your app.

```js
const check = payment.getCheck(12345);
console.log(check);
```

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| check_id | number | Check ID.   |

Returns `Promise` with `Check`

## getBalances

Use this method to get balances of your app.

```js
const balances = payment.getBalances();
console.log(balances);
```

Returns `Promise` with `Balance[]`

## getBalance

Use this method to get balance of your app.

```js
const balance = payment.getBalance('TON');
console.log(balance);
```

| Field         | Type  | Description                     |
| ------------- | ----- | ------------------------------- |
| currency_code | Asset | Cryptocurrency alphabetic code. |

Returns `Promise` with `Balance`

## getExchangeRates

Use this method to get exchange rates of supported currencies.

```js
const exchangeRates = payment.getExchangeRates();
console.log(exchangeRates);
```

Returns `Promise` with `ExchangeRate[]`

## getExchangeRate

Use this method to get exchange rate of supported currencies.

```js
const exchangeRate = payment.getExchangeRate('TON', 'USD');
console.log(exchangeRate);
```

| Field    | Type                        | Description                     |
| -------- | --------------------------- | ------------------------------- |
| `source` | [`Asset`](./types.md#Asset) | Cryptocurrency alphabetic code. |
| `target` | [`Fiat`](./types.md#Fiat)   | Fiat currency code.             |

Returns `Promise` with `ExchangeRate`

## getCurrencies

Use this method to get a list of supported currencies.

```js
const currencies = payment.getCurrencies();
console.log(currencies);
```

| Field      | Type                   | Description                  |
| ---------- | ---------------------- | ---------------------------- |
| `options?` | `GetCurrenciesOptions` | Additional optional options. |

Returns `Promise` with `Currency[]`

## getCurrency

Use this method to get supported currency.

```js
const currency = payment.getCurrency('TON');
console.log(currency);
```

| Field  | Type                                                     | Description                                      |
| ------ | -------------------------------------------------------- | ------------------------------------------------ |
| `code` | [`Asset`](./types.md#Asset) or [`Fiat`](./types.md#Fiat) | Cryptocurrency alphabetic or fiat currency code. |

Returns `Promise` with `Currency`
