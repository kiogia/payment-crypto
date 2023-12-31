/**
 * @hidden
 */
interface CommonInvoiceCurrency {
  /** Amount of the invoice for which the invoice was created. */
  amount: number;
  /** List of assets which can be used to pay the invoice. */
  accepted_assets?: Asset[];
}

/**
 * @hidden
 */
interface CryptoInvoiceCurrency extends CommonInvoiceCurrency {
  /** Type of the price. */
  currency_type: 'crypto';
  /** Cryptocurrency alphabetic code. */
  asset: Asset;
}

/**
 * @hidden
 */
interface FiatInvoiceCurrency extends CommonInvoiceCurrency {
  /** Type of the price. */
  currency_type: 'fiat';
  /** Fiat currency code. */
  fiat: Fiat;
}

/**
 * @hidden
 */
interface CommonInvoice {
  /** Unique ID for this invoice. */
  invoice_id: number;
  /** Hash of the invoice. */
  hash: string;
  /** Type of the price. */
  currency_type: CurrencyType;
  /** Amount of the invoice for which the invoice was created. */
  amount: number;
  /**
   * Amount of charged service fees.
   * @deprecated
   */
  fee?: number;
  /** URL should be provided to the user to pay the invoice. */
  bot_invoice_url: string;
  /**
   * URL should be provided to the user to pay the invoice.
   * @deprecated
   */
  pay_url?: string;
  /** Description for this invoice. */
  description?: string;
  /** Status of the transfer. */
  status: InvoiceStatus;
  /** Date the invoice was created in Unix format. */
  created_at: number;
  /**
   * Price of the asset in USD.
   * @deprecated
   */
  usd_rate?: number;
  /** `True`, if the user can add comment to the payment. */
  allow_comments: boolean;
  /** `True`, if the user can pay the invoice anonymously. */
  allow_anonymous: boolean;
  /** Date the invoice expires in Unix time. */
  expiration_date?: number;
  /** Text of the hidden message for this invoice. */
  hidden_message?: string;
  /** Previously provided data for this invoice. */
  payload?: string;
  /** Label of the button. */
  paid_btn_name?: PaidButtonName;
  /** URL opened using the button. */
  paid_btn_url?: string;
}

/**
 * @hidden
 */
interface CryptoInvoice extends CommonInvoice {
  /** Type of the price. */
  currency_type: 'crypto';
  /** Cryptocurrency code if the field `currency_type` has `crypto` as a value. */
  asset: Asset;
}

/**
 * @hidden
 */
interface FiatInvoice extends CommonInvoice {
  /** Type of the price. */
  currency_type: 'fiat';
  /** Fiat currency code if the field `currency_type` has `fiat` as a value. */
  fiat: Fiat;
  /** List of assets which can be used to pay the invoice if the field `currency_type` has `fiat` as a value. */
  accepted_assets: Asset[];
}

/**
 * @hidden
 */
interface PaidInvoice extends CommonInvoice {
  /** Status of the transfer. */
  status: 'paid';
  /** Asset of service fees charged when the invoice was paid. */
  fee_asset: Asset;
  /** Amount of service fees charged when the invoice was paid. */
  fee_amount: number;
  /** Date the invoice was paid in Unix time. */
  paid_at: number;
  /** Price of the `asset` in USD. */
  paid_usd_rate: number;
  /** True, if the invoice was paid anonymously. */
  paid_anonymously?: boolean;
  /** Comment to the payment from the user. */
  comment?: string;
}

/**
 * @hidden
 */
interface PaidFiatInvoice extends PaidAndFiatInvoice {
  /** Cryptocurrency alphabetic code for which the invoice was paid. */
  paid_asset: Asset;
  /** Amount of the invoice for which the invoice was paid. */
  paid_amount: number;
  /** The rate of the paid_asset valued in the fiat currency if the field `currency_type` has `fiat` as a value. */
  paid_fiat_rate: number;
}

/**
 * @hidden
 */
interface Updates {
  invoice_paid: Invoice;
}

/**
 * @hidden
 */
type PaidAndFiatInvoice = FiatInvoice & PaidInvoice;

export type AppInfo = {
  /** Application ID. */
  app_id: number;
  /** Application name. */
  name: string;
  /** Bot processing requests. */
  payment_processing_bot_username: ProcessingBot;
};

export type PaymentCryptoOptions = {
  /** Blockchain network mode. */
  mode?: 'mainnet' | 'testnet';
  /** Protocol of sent requests. */
  protocol?: 'http' | 'https';
  /** Webhook configuration. */
  webhook?: {
    /** Path for the webhook. */
    path?: string;
    /** Port for the webhook. */
    port?: number;
  };
};

export type GetCurrenciesOptions = {
  /** Filter to retrieve currencies that operate on a blockchain. */
  is_blockchain?: boolean;
  /** Filter to retrieve stablecoin currencies. */
  is_stablecoin?: boolean;
  /** Filter to retrieve fiat currencies. */
  is_fiat?: boolean;
};

export type CreateInvoiceOptions = {
  /** Description for the invoice. User will see this description when they pay the invoice. Up to 1024 characters. */
  description?: string;
  /** Text of the message which will be presented to a user after the invoice is paid. Up to `2048` characters. */
  hidden_message?: string;
  /** Label of the button which will be presented to a user after the invoice is paid. */
  paid_btn_name?: PaidButtonName;
  /** Required if `paid_btn_name` is used. URL opened using the button which will be presented to a user after the invoice is paid. You can set any callback link (for example, a success link or link to homepage). Starts with `https` or `http`. */
  paid_btn_url?: string;
  /** Any data you want to attach to the invoice (for example, user ID, payment ID, ect). Up to `4kb`. */
  payload?: string;
  /** Allow a user to add a comment to the payment. */
  allow_comments?: boolean;
  /** Allow a user to pay the invoice anonymously. */
  allow_anonymous?: boolean;
  /** You can set a payment time limit for the invoice in seconds. Values between `1-2678400` are accepted. */
  expires_in: number;
};

export type TransferOptions = {
  /** Comment for the transfer. Users will see this comment when they get notified about the transfer. Up to `1024` symbols. */
  comment?: string;
  /** Pass true if the user should not receive a notification about the completed transfer. */
  disable_send_notification?: boolean;
};

export type GetInvoicesOptions = {
  /** Cryptocurrency alphabetic code. */
  asset?: Asset;
  /** Fiat currency code. */
  fiat?: Fiat;
  /** List of invoice IDs. */
  invoice_ids?: number[];
  /** Status of invoices to be returned. */
  status?: InvoiceStatus;
  /** Offset needed to return a specific subset of invoices. */
  offset?: number;
  /** Number of invoices to be returned. Values between `1-1000` are accepted.  */
  count?: number;
};

export type GetTransfersOptions = {
  /** Cryptocurrency alphabetic code. */
  asset: Asset;
  /** List of transfer IDs. */
  transfer_ids?: number[];
  /** Offset needed to return a specific subset of transfers. */
  offset?: number;
  /** Number of transfers to be returned. Values between `1-1000` are accepted.  */
  count?: number;
};

export type GetChecksOptions = {
  /** Cryptocurrency alphabetic code. */
  asset?: Asset;
  /** List of check IDs. */
  check_ids?: number[];
  /** Status of check to be returned. */
  status?: CheckStatus;
  /** Offset needed to return a specific subset of checks. */
  offset?: number;
  /** Number of checks to be returned. Values between `1-1000` are accepted. */
  count?: number;
};

export type Transfer = {
  /** Unique ID for this transfer. */
  transfer_id: number;
  /** Telegram user ID the transfer was sent to. */
  user_id: number;
  /** Cryptocurrency alphabetic code. */
  asset: Asset;
  /** Amount of the transfer. */
  amount: number;
  /** Status of the transfer. */
  status: TransferStatus;
  /** Date the transfer was completed in Unix format.  */
  completed_at: number;
  /** Comment for this transfer. */
  comment?: string;
};

export type Check = {
  /** Unique ID for this check. */
  check_id: number;
  /** Hash of the check. */
  hash: string;
  /** Cryptocurrency alphabetic code. */
  asset: Asset;
  /** Amount of the check. */
  amount: number;
  /** URL should be provided to the user to activate the check. */
  bot_check_url: string;
  /** Status of the check. */
  status: CheckStatus;
  /** Date the check was created in Unix format. */
  created_at: number;
  /** Date the check was activated in Unix format. */
  activated_at?: number;
};

export type Balance = {
  /** Cryptocurrency alphabetic code. */
  currency_code: Asset;
  /** Total available amount. */
  available: number;
  /** Unavailable amount currently is on hold. */
  onhold: number;
};

export type ExchangeRate = {
  /** True, if the current rate is valid. */
  is_valid: boolean;
  /** True, if `source` is crypto. */
  is_crypto: boolean;
  /** True, if `source` is fiat. */
  is_fiat: boolean;
  /** Cryptocurrency alphabetic code. */
  source: Asset;
  /** Fiat currency code. */
  target: Fiat;
  /** The current rate of the source asset valued in the target currency. */
  rate: number;
};

export type Currency = {
  /** Indicates whether the currency operates on a blockchain. */
  is_blockchain: boolean;
  /** Indicates whether the currency is a stablecoin. */
  is_stablecoin: boolean;
  /** Indicates whether the currency is a fiat currency. */
  is_fiat: boolean;
  /** The name of the currency. */
  name: CurrencyName;
  /** The code of the currency. */
  code: Asset | Fiat;
  /** URL providing additional information about the currency. */
  url?: string;
  /** The number of decimal places used for representing fractional amounts of the currency. */
  decimals: number;
};

export type TransferStatus = 'completed';
export type InvoiceStatus = 'active' | 'paid' | 'expired';
export type CheckStatus = 'active' | 'activated';
export type CurrencyType = 'crypto' | 'fiat';
export type ProcessingBot = 'CryptoBot' | 'CryptoTestnetBot';
export type PaidButtonName =
  | 'viewItem'
  | 'openChannel'
  | 'openBots'
  | 'callback';
export type InvoiceCurrencyOptions =
  | CryptoInvoiceCurrency
  | FiatInvoiceCurrency;
export type Invoice =
  | (CryptoInvoice | FiatInvoice)
  | PaidInvoice
  | PaidFiatInvoice;

export type Update<UpdateType> = {
  /** Non-unique update ID. */
  update_id: number;
  /** Date the request was sent in Unix format. */
  request_date: number;
  // @ts-ignore
} & Updates[UpdateType];

export type Asset =
  | 'USDT'
  | 'TON'
  | 'BTC'
  | 'ETH'
  | 'LTC'
  | 'BNB'
  | 'TRX'
  | 'USDC'
  | 'JET';

export type Fiat =
  | 'USD'
  | 'EUR'
  | 'RUB'
  | 'BYN'
  | 'UAH'
  | 'GBP'
  | 'CNY'
  | 'KZT'
  | 'UZS'
  | 'GEL'
  | 'TRY'
  | 'AMD'
  | 'THB'
  | 'INR'
  | 'BRL'
  | 'IDR'
  | 'AZN'
  | 'AED'
  | 'PLN'
  | 'ILS';

export type CurrencyName =
  | 'Tether'
  | 'Toncoin'
  | 'Bitcoin'
  | 'Litecoin'
  | 'Ethereum'
  | 'Binance Coin'
  | 'TRON'
  | 'USD Coin'
  | 'Jetton'
  | 'Russian ruble'
  | 'United States dollar'
  | 'Euro'
  | 'Belarusian ruble'
  | 'Ukrainian hryvnia'
  | 'Pound sterling'
  | 'Renminbi'
  | 'Kazakhstani tenge'
  | 'Uzbekistani som'
  | 'Georgian lari'
  | 'Turkish lira'
  | 'Armenian dram'
  | 'Thai baht'
  | 'Indian rupee'
  | 'Brazilian real'
  | 'Indonesian rupiah'
  | 'Azerbaijani manat'
  | 'United Arab Emirates dirham'
  | 'Polish zloty'
  | 'Israeli new shekel';
