# Changelog

## 1.4.0

- Added the fields `mini_app_invoice_url`, `web_app_invoice_url` to the class `Invoice`

> 21 June, 2024

## 1.3.0

- Added the ability to get app statistics using the `getStats` method and the class `AppStats`.
- Added the ability to create checks with attachment to the user through the `id` or his `username`.

> 15 March, 2024

## 1.2.0

- Added the methods `createCheck`, `deleteCheck`, `getChecks` and the class `Check` to manage checks by using the app.
- Added the parameters `currency_type`, fiat and `accepted_assets` to the method `createInvoice` to create invoices for the amount specified in a fiat currency.
- Added the ability to delete invoices using the method `deleteInvoice`.
- Added the ability to get the list of transfers using the method getTransfers.
- Added the fields `currency_type`, `fiat`, `paid_asset`, `paid_amount`, `paid_usd_rate`, `paid_fiat_rate`, `fee_asset`, `fee_amount` and `accepted_assets` to the class `Invoice`.
- The field `fee` in the Webhook update payload is now deprecated, use the new field fee_amount in the class `Invoice` instead.
- The field `usd_rate` in the Webhook update payload is now deprecated, use the new field `paid_usd_rate` in the class `Invoice` instead.
- The field `pay_url` is now deprecated, use the new field `bot_invoice_url` in the class `Invoice` instead.
- Added the field `onhold` to the class `Balance`.

> 24 November, 2023

## 1.1.5

- Discontinued support for `BUSD`.

> September 30, 2023

## 1.1.4

- Added support for `LTC` to the `mainnet`.

> September 22, 2023

## 1.1.3

- Added the field fee to the class `Invoice` to show the amount of charged service fees. Returned only in the Webhook update payload.
- Added the field usd_rate to the class `Invoice` to show the price of the asset in USD. Returned only in the Webhook update payload.

> October 3, 2022

## 1.1.2

- Method transfer is disabled by default for new apps.
- You can set an allowlist of IP addresses under the “Security” button in the app settings.

> September 5, 2022

## 1.1.1

- Added support for `ETH` to the `mainnet`.

> July 26, 2022

## 1.1.0

- Apps can now send coins to users using the new method transfer.
- Added support for hidden message in invoices.
- New parameter `expires_in` to set a payment time limit for new invoices.
- Added new `expiration_date` field in Invoice object.

> February 2, 2022

## 1.0.0

- Release

> 6 December, 2021
