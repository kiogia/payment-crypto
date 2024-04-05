import url from 'url';
import crypto from 'crypto';
import express from 'express';

export class PaymentCrypto {
  constructor(token, options = {}) {
    this.token = token;
    this.callbacks = {};
    const modes = {
      mainnet: 'pay.crypt.bot',
      testnet: 'testnet-pay.crypt.bot',
    };
    this.options = {
      protocol: options.protocol || 'https',
      hostname: modes[options.mode || 'mainnet'],
    };

    if (options.webhook) {
      const server = express();
      server.use(express.json());
      server.listen(options.webhook.port || 3000);

      const path = this.options.webhook?.path || this.token;
      server.post('/' + path, (req, res) => {
        if (req.body.update_type == updateType) {
          if (this.#verifyUpdate(req)) {
            const payload = this.#formatResponse(req.body?.payload);
            const { update_id, request_date } = this.#formatResponse(req.body);
            res.sendStatus(200);
            if (this.callbacks[updateType]) {
              this.callbacks[updateType].forEach((callback) => {
                callback({ update_id, request_date, ...payload });
              });
            }
          } else {
            res.sendStatus(500);
          }
        }
      });
    }
  }

  #request(url, options) {
    return fetch(url, options)
      .then((result) => result.json())
      .then((result) => {
        if (result.ok) {
          return result.result;
        } else {
          throw new Error(JSON.stringify(result.error, null, 2));
        }
      });
  }

  #verifyUpdate({ body, headers }) {
    const secret = crypto.createHash('sha256').update(this.token).digest();
    const checkString = JSON.stringify(body);
    const hmac = crypto
      .createHmac('sha256', secret)
      .update(checkString)
      .digest('hex');
    return hmac === headers['crypto-pay-api-signature'];
  }

  #formatResponse(response) {
    if (!response) {
      return response;
    }
    if (Array.isArray(response)) {
      return response.map((value) => {
        return this.#formatResponse(value);
      });
    } else {
      const numberKeys = [
        'amount',
        'available',
        'fee_amount',
        'fee_in_usd',
        'onhold',
        'paid_amount',
        'paid_fiat_rate',
        'paid_usd_rate',
        'rate',
      ];
      const dateKeys = [
        'start_at',
        'end_at',
        'completed_at',
        'created_at',
        'expiration_date',
        'paid_at',
        'request_date',
      ];
      const keys = [...numberKeys, ...dateKeys];
      return keys.reduce((previous, current) => {
        if (response[current] && dateKeys.includes(current)) {
          previous[current] = new Date(previous[current]).getTime();
        }
        if (response[current] && !dateKeys.includes(current)) {
          previous[current] = Number(previous[current]);
        }
        return previous;
      }, response);
    }
  }

  callApi(method, params = {}) {
    const requestURL = url.format({
      ...this.options,
      pathname: `api/${method}`,
      query: params,
    });
    return this.#request(requestURL, {
      headers: { 'Crypto-Pay-API-Token': this.token },
    });
  }

  on(updateType, callback) {
    this.callbacks[updateType] ??= [];
    this.callbacks[updateType].push(callback);
  }

  getMe() {
    return this.callApi('getMe');
  }

  getStats(options = {}) {
    return this.callApi('getStats', {
      start_at: new Date(options?.start_at),
      end_at: new Date(options?.end_at),
    }).then((invoice) => {
      return this.#formatResponse(invoice);
    });
  }

  createInvoice(currency, options = {}) {
    return this.callApi('createInvoice', {
      ...currency,
      ...options,
    }).then((invoice) => {
      return this.#formatResponse(invoice);
    });
  }

  deleteInvoice(invoice_id) {
    return this.callApi('deleteInvoice', { invoice_id });
  }

  createCheck(asset, amount) {
    return this.callApi('createCheck', { asset, amount }).then((check) => {
      return this.#formatResponse(check);
    });
  }

  deleteCheck(check_id) {
    return this.callApi('deleteCheck', { check_id });
  }

  transfer(user_id, asset, amount, spend_id, options = {}) {
    return this.callApi('transfer', {
      user_id,
      asset,
      amount,
      spend_id,
      ...options,
    }).then((transfer) => {
      return this.#formatResponse(transfer);
    });
  }

  generateSpendID(length = 64) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters[randomIndex];
    }).join('');
  }

  getInvoices(options = {}) {
    return this.callApi('getInvoices', options).then((invoices) => {
      return this.#formatResponse(invoices.items);
    });
  }

  getInvoice(invoice_id) {
    return this.getInvoices({ invoice_ids: [invoice_id] }).then((invoices) => {
      return invoices[0];
    });
  }

  getTransfers(options = {}) {
    return this.callApi('getTransfers', options).then((transfers) => {
      return this.#formatResponse(transfers.items);
    });
  }

  getTransfer(transfer_id) {
    return this.getTransfers({
      transfer_ids: [transfer_id],
    }).then((transfers) => {
      return transfers[0];
    });
  }

  getChecks(options = {}) {
    return this.callApi('getChecks', options).then((checks) => {
      return this.#formatResponse(checks.items);
    });
  }

  getCheck(check_id) {
    return this.getChecks({ check_ids: [check_id] }).then((checks) => {
      return checks[0].status;
    });
  }

  getBalances() {
    return this.callApi('getBalance').then((balances) => {
      return this.#formatResponse(balances);
    });
  }

  getBalance(currency_code) {
    return this.getBalances().then((balances) => {
      return balances.find((balance) => {
        return balance.currency_code == currency_code;
      });
    });
  }

  getExchangeRates() {
    return this.callApi('getExchangeRates').then((exchangeRates) => {
      return this.#formatResponse(exchangeRates);
    });
  }

  getExchangeRate(source, target) {
    return this.getExchangeRates().then((exchangeRates) => {
      return exchangeRates.find((rate) => {
        return rate.source == source && rate.target == target;
      });
    });
  }

  getCurrencies(options = {}) {
    return this.callApi('getCurrencies').then((currencies) => {
      return currencies.filter((currency) => {
        return Object.entries(options).every(([key, value]) => {
          return currency[key] === value;
        });
      });
    });
  }

  getCurrency(code) {
    return this.getCurrencies().then((currencies) => {
      return currencies.find((currency) => {
        return currency.code == code;
      });
    });
  }
}
