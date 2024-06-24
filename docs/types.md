# Types

## AppInfo

| Field                             | Type                              | Optional | Description              |
| --------------------------------- | --------------------------------- | -------- | ------------------------ |
| `app_id`                          | `number`                          | `false`  | Application ID.          |
| `name`                            | `string`                          | `false`  | Application name.        |
| `payment_processing_bot_username` | [`ProcessingBot`](#processingbot) | `false`  | Bot processing requests. |

## AppStats

| Field                   | Type     | Optional | Description                                                              |
| ----------------------- | -------- | -------- | ------------------------------------------------------------------------ |
| `volume`                | `number` | `false`  | Total volume of paid invoices in USD.                                    |
| `conversion`            | `number` | `false`  | Conversion of all created invoices.                                      |
| `unique_users_count`    | `number` | `false`  | The unique number of users who have paid the invoice.                    |
| `created_invoice_count` | `number` | `false`  | Total created invoice count.                                             |
| `paid_invoice_count`    | `number` | `false`  | Total paid invoice count.                                                |
| `start_at`              | `number` | `false`  | The date on which the statistics calculation was started in Unix format. |
| `end_at`                | `number` | `false`  | The date on which the statistics calculation was ended in Unix format.   |

## GetStatsOptions

| Field      | Type                 | Optional | Description                                                        |
| ---------- | -------------------- | -------- | ------------------------------------------------------------------ |
| `start_at` | `string` or `number` | `true`   | Date from which start calculating statistics in Unix format.       |
| `end_at`   | `string` or `number` | `true`   | The date on which to finish calculating statistics in Unix format. |

## GetCurrenciesOptions

| Field           | Type      | Optional | Description                                                 |
| --------------- | --------- | -------- | ----------------------------------------------------------- |
| `is_blockchain` | `boolean` | `true`   | Filter to retrieve currencies that operate on a blockchain. |
| `is_stablecoin` | `boolean` | `true`   | Filter to retrieve stablecoin currencies.                   |
| `is_fiat`       | `boolean` | `true`   | Filter to retrieve fiat currencies.                         |

## CreateInvoiceOptions

| Field             | Type                                | Optional | Description                                                                                                                                                                                                                                   |
| ----------------- | ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`     | `string`                            | `true`   | Description for the invoice. User will see this description when they pay the invoice. Up to 1024 characters.                                                                                                                                 |
| `hidden_message`  | `string`                            | `true`   | Text of the message which will be presented to a user after the invoice is paid. Up to `2048` characters.                                                                                                                                     |
| `paid_btn_name`   | [`PaidButtonName`](#paidbuttonname) | `true`   | Label of the button which will be presented to a user after the invoice is paid.                                                                                                                                                              |
| `paid_btn_url`    | `string`                            | `true`   | Required if `paid_btn_name` is used. URL opened using the button which will be presented to a user after the invoice is paid. You can set any callback link (for example, a success link or link to homepage). Starts with `https` or `http`. |
| `payload`         | `string`                            | `true`   | Any data you want to attach to the invoice (for example, user ID, payment ID, ect). Up to `4kb`.                                                                                                                                              |
| `allow_comments`  | `boolean`                           | `true`   | Allow a user to add a comment to the payment.                                                                                                                                                                                                 |
| `allow_anonymous` | `boolean`                           | `true`   | Allow a user to pay the invoice anonymously.                                                                                                                                                                                                  |
| `expires_in`      | `number`                            | `false`  | You can set a payment time limit for the invoice in seconds. Values between `1-2678400` are accepted.                                                                                                                                         |

## CreateCheckOptions

| Field             | Type     | Optional | Description                                                            |
| ----------------- | -------- | -------- | ---------------------------------------------------------------------- |
| `pin_to_user_id`  | `number` | `true`   | ID of the user who will be able to activate the check.                 |
| `pin_to_username` | `string` | `true`   | A user with the specified username will be able to activate the check. |

## TransferOptions

| Field                       | Type      | Optional | Description                                                                                                            |
| --------------------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `comment`                   | `string`  | `true`   | Comment for the transfer. Users will see this comment when they get notified about the transfer. Up to `1024` symbols. |
| `disable_send_notification` | `boolean` | `true`   | Pass true if the user should not receive a notification about the completed transfer.                                  |

## GetInvoicesOptions

| Field         | Type                              | Optional | Description                                                              |
| ------------- | --------------------------------- | -------- | ------------------------------------------------------------------------ |
| `asset`       | [`Asset`](#asset)                 | `true`   | Cryptocurrency alphabetic code.                                          |
| `fiat`        | [`Fiat`](#fiat)                   | `true`   | Fiat currency code.                                                      |
| `invoice_ids` | Array of `number`                 | `true`   | List of invoice IDs.                                                     |
| `status`      | [`InvoiceStatus`](#invoicestatus) | `true`   | Status of invoices to be returned.                                       |
| `offset`      | `number`                          | `true`   | Offset needed to return a specific subset of invoices.                   |
| `count`       | `number`                          | `true`   | Number of invoices to be returned. Values between `1-1000` are accepted. |

## GetTransfersOptions

| Field           | Type              | Optional | Description                                                               |
| --------------- | ----------------- | -------- | ------------------------------------------------------------------------- |
| `asset`         | [`Asset`](#asset) | `false`  | Cryptocurrency alphabetic code.                                           |
| `transfer_ids?` | Array of `number` | `true`   | List of transfer IDs.                                                     |
| `offset?`       | `number`          | `true`   | Offset needed to return a specific subset of transfers.                   |
| `count?`        | `number`          | `true`   | Number of transfers to be returned. Values between `1-1000` are accepted. |

## GetChecksOptions

| Field        | Type                          | Optional | Description                                                            |
| ------------ | ----------------------------- | -------- | ---------------------------------------------------------------------- |
| `asset?`     | [`Asset`](#asset)             | `true`   | Cryptocurrency alphabetic code.                                        |
| `check_ids?` | Array of `number`             | `true`   | List of check IDs.                                                     |
| `status?`    | [`CheckStatus`](#checkstatus) | `true`   | Status of check to be returned.                                        |
| `offset?`    | `number`                      | `true`   | Offset needed to return a specific subset of checks.                   |
| `count?`     | `number`                      | `true`   | Number of checks to be returned. Values between `1-1000` are accepted. |

## Transfer

| Field          | Type                                | Optional | Description                                     |
| -------------- | ----------------------------------- | -------- | ----------------------------------------------- |
| `transfer_id`  | `number`                            | `false`  | Unique ID for this transfer.                    |
| `user_id`      | `number`                            | `false`  | Telegram user ID the transfer was sent to.      |
| `asset`        | [`Asset`](#asset)                   | `false`  | Cryptocurrency alphabetic code.                 |
| `amount`       | `number`                            | `false`  | Amount of the transfer.                         |
| `status`       | [`TransferStatus`](#transferstatus) | `false`  | Status of the transfer.                         |
| `completed_at` | `number`                            | `false`  | Date the transfer was completed in Unix format. |
| `comment?`     | `string`                            | `true`   | Comment for this transfer.                      |

## Check

| Field           | Type                          | Optional | Description                                               |
| --------------- | ----------------------------- | -------- | --------------------------------------------------------- |
| `check_id`      | `number`                      | `false`  | Unique ID for this check.                                 |
| `hash`          | `string`                      | `false`  | Hash of the check.                                        |
| `asset`         | [`Asset`](#asset)             | `false`  | Cryptocurrency alphabetic code.                           |
| `amount`        | `number`                      | `false`  | Amount of the check.                                      |
| `bot_check_url` | `string`                      | `false`  | URL should be provided to the user to activate the check. |
| `status`        | [`CheckStatus`](#checkstatus) | `false`  | Status of the check.                                      |
| `created_at`    | `number`                      | `false`  | Date the check was created in Unix format.                |
| `activated_at?` | `number`                      | `true`   | Date the check was activated in Unix format.              |

## Balance

| Field           | Type              | Optional | Description                              |
| --------------- | ----------------- | -------- | ---------------------------------------- |
| `currency_code` | [`Asset`](#asset) | `false`  | Cryptocurrency alphabetic code.          |
| `available`     | `number`          | `false`  | Total available amount.                  |
| `onhold`        | `number`          | `false`  | Unavailable amount currently is on hold. |

## ExchangeRate

| Field       | Type              | Optional | Description                                                         |
| ----------- | ----------------- | -------- | ------------------------------------------------------------------- |
| `is_valid`  | `boolean`         | `false`  | True, if the current rate is valid.                                 |
| `is_crypto` | `boolean`         | `false`  | True, if `source` is `crypto`.                                      |
| `is_fiat`   | `boolean`         | `false`  | True, if `source` is `fiat`.                                        |
| `source`    | [`Asset`](#asset) | `false`  | Cryptocurrency alphabetic code.                                     |
| `target`    | `[Fiat](#Fiat)`   | `false`  | Fiat currency code.                                                 |
| `rate`      | `number`          | `false`  | The current rate of the source asset valued in the target currency. |

## Currency

| Field           | Type                                 | Optional | Description                                                                            |
| --------------- | ------------------------------------ | -------- | -------------------------------------------------------------------------------------- |
| `is_blockchain` | `boolean`                            | `false`  | Indicates whether the currency operates on a blockchain.                               |
| `is_stablecoin` | `boolean`                            | `false`  | Indicates whether the currency is a stablecoin.                                        |
| `is_fiat`       | `boolean`                            | `false`  | Indicates whether the currency is a fiat currency.                                     |
| `name`          | [`CurrencyName`](#currencyname)      | `false`  | The name of the currency.                                                              |
| `code`          | [`Asset`](#asset) or [`Fiat`](#fiat) | `false`  | The code of the currency.                                                              |
| `url?`          | `string`                             | `true`   | URL providing additional information about the currency.                               |
| `decimals`      | `number`                             | `false`  | The number of decimal places used for representing fractional amounts of the currency. |

## Invoice

| Field                  | Type             | Optional | Description                                                                                                |
| ---------------------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `invoice_id`           | `number`         | `false`  | Unique ID for this invoice.                                                                                |
| `hash`                 | `string`         | `false`  | Hash of the invoice.                                                                                       |
| `currency_type`        | `CurrencyType`   | `false`  | Type of the price.                                                                                         |
| `amount`               | `number`         | `false`  | Amount of the invoice for which the invoice was created.                                                   |
| ~~`fee`~~              | `number`         | `true`   | ~~Amount of charged service fees.~~                                                                        |
| `bot_invoice_url`      | `string`         | `false`  | URL should be provided to the user to pay the invoice.                                                     |
| ~~`pay_url`~~          | `string`         | `true`   | ~~URL should be provided to the user to pay the invoice.~~                                                 |
| `description`          | `string`         | `true`   | Description for this invoice.                                                                              |
| `status`               | `InvoiceStatus`  | `false`  | Status of the transfer.                                                                                    |
| `created_at`           | `number`         | `false`  | Date the invoice was created in Unix format.                                                               |
| ~~`usd_rate`~~         | `number`         | `true`   | ~~Price of the asset in USD.~~                                                                             |
| `allow_comments`       | `boolean`        | `false`  | `True`, if the user can add comment to the payment.                                                        |
| `allow_anonymous`      | `boolean`        | `false`  | `True`, if the user can pay the invoice anonymously.                                                       |
| `expiration_date`      | `number`         | `true`   | Date the invoice expires in Unix time.                                                                     |
| `hidden_message`       | `string`         | `true`   | Text of the hidden message for this invoice.                                                               |
| `payload`              | `string`         | `true`   | Previously provided data for this invoice.                                                                 |
| `paid_btn_name`        | `PaidButtonName` | `true`   | Label of the button.                                                                                       |
| `paid_btn_url`         | `string`         | `true`   | URL opened using the button.                                                                               |
| `mini_app_invoice_url` | `string`         | `true`   | Use this URL to pay an invoice to the Telegram Mini App version.                                           |
| `web_app_invoice_url`  | `string`         | `true`   | Use this URL to pay an invoice to the Web version of Crypto Bot.                                           |
| `asset`                | `Asset`          | `true`   | Cryptocurrency code if the field `currency_type` has `crypto` as a value.                                  |
| `fiat`                 | `Fiat`           | `true`   | Fiat currency code if the field `currency_type` has `fiat` as a value.                                     |
| `accepted_assets`      | Array of `Asset` | `true`   | List of assets which can be used to pay the invoice if the field `currency_type` has `fiat` as a value.    |
| `fee_asset`            | `Asset`          | `true`   | Asset of service fees charged when the invoice was paid.                                                   |
| `fee_amount`           | `number`         | `true`   | Amount of service fees charged when the invoice was paid.                                                  |
| `paid_at`              | `number`         | `true`   | Date the invoice was paid in Unix time.                                                                    |
| `paid_usd_rate`        | `number`         | `true`   | Price of the `asset` in USD.                                                                               |
| `paid_anonymously`     | `boolean`        | `true`   | True, if the invoice was paid anonymously.                                                                 |
| `comment`              | `string`         | `true`   | Comment to the payment from the user.                                                                      |
| `paid_asset`           | `Asset`          | `true`   | Cryptocurrency alphabetic code for which the invoice was paid.                                             |
| `paid_amount`          | `number`         | `true`   | Amount of the invoice for which the invoice was paid.                                                      |
| `paid_fiat_rate`       | `number`         | `true`   | The rate of the paid_asset valued in the fiat currency if the field `currency_type` has `fiat` as a value. |

## Protocol

| Field     | Value     | Type     |
| --------- | --------- | -------- |
| `Mainnet` | `mainnet` | `string` |
| `Testnet` | `testnet` | `string` |

## Mode

| Field     | Value     | Type     |
| --------- | --------- | -------- |
| `Mainnet` | `mainnet` | `string` |
| `Testnet` | `testnet` | `string` |

## TransferStatus

| Field       | Value       | Type     |
| ----------- | ----------- | -------- |
| `Completed` | `completed` | `string` |

## InvoiceStatus

| Field     | Value     | Type     |
| --------- | --------- | -------- |
| `Active`  | `active`  | `string` |
| `Paid`    | `paid`    | `string` |
| `Expired` | `expired` | `string` |

## CheckStatus

| Field       | Value       | Type     |
| ----------- | ----------- | -------- |
| `Active`    | `active`    | `string` |
| `Activated` | `activated` | `string` |

## CurrencyTypeValue

| Field    | Value    | Type     |
| -------- | -------- | -------- |
| `Crypto` | `crypto` | `string` |
| `Fiat`   | `fiat`   | `string` |

## ProcessingBot

| Field     | Value              | Type     |
| --------- | ------------------ | -------- |
| `Mainnet` | `CryptoBot`        | `string` |
| `Testnet` | `CryptoTestnetBot` | `string` |

## PaidButtonName

| Field         | Value         | Type     |
| ------------- | ------------- | -------- |
| `ViewItem`    | `viewItem`    | `string` |
| `OpenChannel` | `openChannel` | `string` |
| `OpenBots`    | `openBots`    | `string` |
| `Callback`    | `callback`    | `string` |

## Asset

| Field  | Value  | Type     |
| ------ | ------ | -------- |
| `USDT` | `USDT` | `string` |
| `TON`  | `TON`  | `string` |
| `BTC`  | `BTC`  | `string` |
| `ETH`  | `ETH`  | `string` |
| `LTC`  | `LTC`  | `string` |
| `BNB`  | `BNB`  | `string` |
| `TRX`  | `TRX`  | `string` |
| `USDC` | `USDC` | `string` |
| `JET`  | `JET`  | `string` |

## Fiat

| Field | Value | Type     |
| ----- | ----- | -------- |
| `USD` | `USD` | `string` |
| `EUR` | `EUR` | `string` |
| `RUB` | `RUB` | `string` |
| `BYN` | `BYN` | `string` |
| `UAH` | `UAH` | `string` |
| `GBP` | `GBP` | `string` |
| `CNY` | `CNY` | `string` |
| `KZT` | `KZT` | `string` |
| `UZS` | `UZS` | `string` |
| `GEL` | `GEL` | `string` |
| `TRY` | `TRY` | `string` |
| `AMD` | `AMD` | `string` |
| `THB` | `THB` | `string` |
| `INR` | `INR` | `string` |
| `BRL` | `BRL` | `string` |
| `IDR` | `IDR` | `string` |
| `AZN` | `AZN` | `string` |
| `AED` | `AED` | `string` |
| `PLN` | `PLN` | `string` |
| `ILS` | `ILS` | `string` |

## CurrencyName

| Field  | Value                         | Type     |
| ------ | ----------------------------- | -------- |
| `USDT` | `Tether`                      | `string` |
| `TON`  | `Toncoin`                     | `string` |
| `BTC`  | `Bitcoin`                     | `string` |
| `ETH`  | `Litecoin`                    | `string` |
| `LTC`  | `Ethereum`                    | `string` |
| `BNB`  | `Binance Coin`                | `string` |
| `TRX`  | `TRON`                        | `string` |
| `USDC` | `USD Coin`                    | `string` |
| `JET`  | `Jetton`                      | `string` |
| `USD`  | `Russian ruble`               | `string` |
| `EUR`  | `United States dollar`        | `string` |
| `RUB`  | `Euro`                        | `string` |
| `BYN`  | `Belarusian ruble`            | `string` |
| `UAH`  | `Ukrainian hryvnia`           | `string` |
| `GBP`  | `Pound sterling`              | `string` |
| `CNY`  | `Renminbi`                    | `string` |
| `KZT`  | `Kazakhstani tenge`           | `string` |
| `UZS`  | `Uzbekistani som`             | `string` |
| `GEL`  | `Georgian lari`               | `string` |
| `TRY`  | `Turkish lira`                | `string` |
| `AMD`  | `Armenian dram`               | `string` |
| `THB`  | `Thai baht`                   | `string` |
| `INR`  | `Indian rupee`                | `string` |
| `BRL`  | `Brazilian real`              | `string` |
| `IDR`  | `Indonesian rupiah`           | `string` |
| `AZN`  | `Azerbaijani manat`           | `string` |
| `AED`  | `United Arab Emirates dirham` | `string` |
| `PLN`  | `Polish zloty`                | `string` |
| `ILS`  | `Israeli new shekel`          | `string` |
