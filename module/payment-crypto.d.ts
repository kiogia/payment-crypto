import * as Types from './types';
declare module 'payment-crypto';

export default class PaymentCrypto {
  /**
   * First, you need to create a new app and get API token. Open [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet), go to Crypto Pay and tap **Create App** to get API Token.
   */
  constructor(token: string, options?: Types.PaymentCryptoOptions);

  /**
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
   * Get
   * @event
   * @example
   * ```js
   * bot.on('invoice_paid', (update) => {
   *   console.log(`You got ${update.amount} ${update.asset}!`)
   * })
   * ```
   */
  on<UpdateType extends keyof Types.Updates>(
    updateType: UpdateType,
    callback: (update: Types.Update<UpdateType>) => void
  ): void;

  /**
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
    currency: Types.InvoiceCurrencyOptions,
    options?: Types.CreateInvoiceOptions
  ): Promise<Types.Invoice>;

  /**
   * Use this method to delete invoices created by your app.
   */
  deleteInvoice(
    /** Invoice ID to be deleted. */
    invoice_id: number
  ): Promise<true>;

  /**
   * Use this method to create a new check.
   */
  createCheck(
    /** Cryptocurrency alphabetic code. */
    asset: Types.Asset,
    /** Amount of the invoice in float. */
    amount: number
  ): Promise<Types.Check>;

  /**
   * Use this method to delete checks created by your app.
   */
  deleteCheck(
    /** Check ID to be deleted. */
    check_id: number
  ): Promise<true>;

  /**
   * Use this method to send coins from your app's balance to a user. This method must first be enabled in the security settings of your app. Open [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet), go to Crypto Pay → My Apps, choose an app, then go to Security -> Transfers... and tap **Enable**.
   */
  transfer(
    /** Telegram user ID. User must have previously used [@CryptoBot](https://t.me/CryptoBot) ([@CryptoTestnetBot](https://t.me/CryptoTestnetBot) for testnet). */
    user_id: number,
    /** Cryptocurrency alphabetic code. */
    asset: Types.Asset,
    /** Amount of the transfer in float. The minimum and maximum amount limits for each of the supported assets roughly correspond to 1-25000 USD. Use [getExchangeRates](../docs/functions.md#) to convert amounts. */
    amount: number,
    /** UUID or any random UTF-8 string generated for each transfer to make your request idempotent in cases when it should be retried (for example, request timeout, connection reset, 500 HTTP status, etc). Only one transfer with the same `spend_id` can be accepted from your app. Up to 64 symbols. */
    spend_id: string,
    options?: Types.TransferOptions
  ): Promise<true>;

  /**
   * Generates spend ID for transfer.
   */
  generateSpendID(length?: number): string;

  /**
   * Use this method to get invoices created by your app.
   */
  getInvoices(options?: Types.GetInvoicesOptions): Promise<Types.Invoice[]>;

  /**
   * Use this method to get invoice created by your app.
   */
  getInvoice(invoice_id: number): Promise<Types.Invoice>;

  /**
   * Use this method to get transfers created by your app.
   */
  getTransfers(options?: Types.GetTransfersOptions): Promise<Types.Transfer[]>;

  /**
   * Use this method to get transfer created by your app.
   */
  getTransfer(transfer_id: number): Promise<Types.Transfer>;

  /**
   * Use this method to get checks created by your app.
   */
  getChecks(options?: Types.GetChecksOptions): Promise<Types.Check[]>;

  /**
   * Use this method to get check created by your app.
   */
  getCheck(check_id: number): Promise<Types.Check>;

  /**
   * Use this method to get balances of your app.
   */
  getBalances(): Promise<Types.Balance[]>;

  /**
   * Use this method to get balance of your app.
   */
  getBalance(currency_code: Types.Asset): Promise<Types.Balance>;

  /**
   * Use this method to get exchange rates of supported currencies.
   */
  getExchangeRates(): Promise<Types.ExchangeRate[]>;

  /**
   * Use this method to get exchange rate of supported currencies.
   */
  getExchangeRate(
    source: Types.Asset,
    target: Types.Fiat
  ): Promise<Types.ExchangeRate>;

  /**
   * Use this method to get a list of supported currencies.
   */
  getCurrencies(
    options?: Types.GetCurrenciesOptions
  ): Promise<Types.Currency[]>;

  /**
   * Use this method to get supported currencies.
   */
  getCurrency(code: Types.Asset | Types.Fiat): Promise<Types.Currency>;
}
