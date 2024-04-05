import * as Types from './types';
declare module 'payment-crypto';

export class PaymentCrypto {
  /**
   * @description
   * First, you need to create a new app and get API token. Open [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet), go to Crypto Pay and tap **Create App** to get API Token.
   */
  constructor(token: string, options?: Types.PaymentCryptoOptions);

  /**
   * @description
   * Interface representing a method to call an API with optional parameters.
   * @example
   * ```js
   * const appInfo = await payment.callApi('getMe', {})
   * console.log(appInfo)
   * ```
   */
  callApi(
    /** The API method to be called. */
    method: string,
    /** Optional parameters for the API call. */
    params?: object
  ): Promise<object>;

  /**
   * @event
   * @description
   * Receiving updates.
   * @example
   * ```js
   * bot.on('invoice_paid', (update) => {
   *   console.log(`You got ${update.amount} ${update.asset}!`)
   * })
   * ```
   */
  on<UpdateType extends keyof Types.Updates>(
    /** The type of update received. */
    updateType: UpdateType,
    /** A function that is executed when an update received. */
    callback: (
      /** Information about the update received. */
      update: Types.Update<UpdateType>
    ) => void
  ): void;

  /**
   * @description
   * Use this method to test your app's authentication token and get basic information about an app.
   * @example
   * ```js
   * const appInfo = await payment.getMe()
   * console.log(appInfo)
   * ```
   */
  getMe(): Promise<Types.AppInfo>;

  /**
   * @description
   * Use this method to get app statistics.
   * @example
   * ```js
   * const appStats = await payment.getStats()
   * console.log(appStats)
   * ```
   */
  getStats(
    /** Additional optional options. */
    options: Types.GetStatsOptions
  ): Promise<Types.AppStats>;

  /**
   * @description
   * Use this method to create a new invoice.
   * @example
   * ```js
   * const invoice = await payment.createInvoice({
   *   amount: 3,
   *   asset: 'TON'
   * })
   * console.log(`Payment link ${invoice.bot_invoice_url}`)
   * ```
   * or
   * ```js
   * const invoice = await payment.createInvoice({
   *   currency_type: 'fiat',
   *   amount: 5,
   *   asset: 'USD'
   * })
   * console.log(`Payment link ${invoice.bot_invoice_url}`)
   * ```
   */
  createInvoice(
    /** Required invoice information. */
    currency: Types.InvoiceCurrencyOptions,
    /** Additional optional options. */
    options?: Types.CreateInvoiceOptions
  ): Promise<Types.Invoice>;

  /**
   * @description
   * Use this method to delete invoices created by your app.
   * @example
   * ```js
   * await payment.deleteInvoice(12345)
   * ```
   */
  deleteInvoice(
    /** Invoice ID to be deleted. */
    invoice_id: number
  ): Promise<true>;

  /**
   * @description
   * Use this method to create a new check.
   */
  createCheck(
    /** Cryptocurrency alphabetic code. */
    asset: Types.Asset,
    /** Amount of the invoice in float. */
    amount: number,
    /** Additional optional options. */
    options: Types.CreateCheckOptions
  ): Promise<Types.Check>;

  /**
   * @description
   * Use this method to delete checks created by your app.
   * @example
   * ```js
   * await payment.deleteCheck(12345)
   * ```
   */
  deleteCheck(
    /** Check ID to be deleted. */
    check_id: number
  ): Promise<true>;

  /**
   * @description
   * Use this method to send coins from your app's balance to a user. This method must first be enabled in the security settings of your app. Open [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet), go to Crypto Pay → My Apps, choose an app, then go to Security -> Transfers... and tap **Enable**.
   * @example
   * ```js
   * const spendID = payment.generateSpendID()
   * await payment.transfer(123456789, 'TON', 5, spendID)
   * ```
   */
  transfer(
    /** Telegram user ID. User must have previously used [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet). */
    user_id: number,
    /** Cryptocurrency alphabetic code. */
    asset: Types.Asset,
    /** Amount of the transfer in float. The minimum and maximum amount limits for each of the supported assets roughly correspond to 1-25000 USD. Use [getExchangeRates](../docs/functions.md#) to convert amounts. */
    amount: number,
    /** UUID or any random UTF-8 string generated for each transfer to make your request idempotent in cases when it should be retried (for example, request timeout, connection reset, `500` HTTP status, etc). Only one transfer with the same `spend_id` can be accepted from your app. Up to `64` symbols. */
    spend_id: string,
    /** Additional optional options. */
    options?: Types.TransferOptions
  ): Promise<true>;

  /**
   * @description
   * Generates spend ID for transfer.
   * @example
   * ```js
   * const spendID = payment.generateSpendID(64)
   * console.log(spendID)
   * ```
   */
  generateSpendID(length?: number): string;

  /**
   * @description
   * Use this method to get invoices created by your app.
   * @example
   * ```js
   * const invoices = payment.getInvoices()
   * console.log(invoices)
   * ```
   */
  getInvoices(
    /** Additional optional options. */
    options?: Types.GetInvoicesOptions
  ): Promise<Types.Invoice[]>;

  /**
   * @description
   * Use this method to get invoice created by your app.
   * @example
   * ```js
   * const invoice = payment.getInvoice(12345)
   * console.log(invoice)
   * ```
   */
  getInvoice(
    /** Invoice IDs. */
    invoice_id: number
  ): Promise<Types.Invoice>;

  /**
   * @description
   * Use this method to get transfers created by your app.
   * @example
   * ```js
   * const transfers = payment.getTransfers()
   * console.log(transfers)
   * ```
   */
  getTransfers(
    /** Additional optional options. */
    options?: Types.GetTransfersOptions
  ): Promise<Types.Transfer[]>;

  /**
   * @description
   * Use this method to get transfer created by your app.
   * @example
   * ```js
   * const transfer = payment.getTransfer(12345)
   * console.log(transfer)
   * ```
   */
  getTransfer(
    /** Transfer IDs. */
    transfer_id: number
  ): Promise<Types.Transfer>;

  /**
   * @description
   * Use this method to get checks created by your app.
   * @example
   * ```js
   * const checks = payment.getChecks()
   * console.log(checks)
   * ```
   */
  getChecks(
    /** Additional optional options. */
    options?: Types.GetChecksOptions
  ): Promise<Types.Check[]>;

  /**
   * @description
   * Use this method to get check created by your app.
   * @example
   * ```js
   * const check = payment.getCheck(12345)
   * console.log(check)
   * ```
   */
  getCheck(
    /** Check ID. */
    check_id: number
  ): Promise<Types.Check>;

  /**
   * @description
   * Use this method to get balances of your app.
   * @example
   * ```js
   * const balances = payment.getBalances()
   * console.log(balances)
   * ```
   */
  getBalances(): Promise<Types.Balance[]>;

  /**
   * @description
   * Use this method to get balance of your app.
   * @example
   * ```js
   * const balance = payment.getBalance('TON')
   * console.log(balance)
   * ```
   */
  getBalance(
    /** Cryptocurrency alphabetic code. */
    currency_code: Types.Asset
  ): Promise<Types.Balance>;

  /**
   * @description
   * Use this method to get exchange rates of supported currencies.
   * @example
   * ```js
   * const exchangeRates = payment.getExchangeRates()
   * console.log(exchangeRates)
   * ```
   */
  getExchangeRates(): Promise<Types.ExchangeRate[]>;

  /**
   * @description
   * Use this method to get exchange rate of supported currencies.
   * @example
   * ```js
   * const exchangeRate = payment.getExchangeRate('TON', 'USD')
   * console.log(exchangeRate)
   * ```
   */
  getExchangeRate(
    /** Cryptocurrency alphabetic code. */
    source: Types.Asset,
    /** Fiat currency code. */
    target: Types.Fiat
  ): Promise<Types.ExchangeRate>;

  /**
   * @description
   * Use this method to get a list of supported currencies.
   * @example
   * ```js
   * const currencies = payment.getCurrencies()
   * console.log(currencies)
   * ```
   */
  getCurrencies(
    /** Additional optional options. */
    options?: Types.GetCurrenciesOptions
  ): Promise<Types.Currency[]>;

  /**
   * @description
   * Use this method to get supported currency.
   * @example
   * ```js
   * const currency = payment.getCurrency('TON')
   * console.log(currency)
   * ```
   */
  getCurrency(
    /** Cryptocurrency alphabetic or fiat currency code. */
    code: Types.Asset | Types.Fiat
  ): Promise<Types.Currency>;
}
