# Examples

::: code-group

```js [Telegraf]
import { Telegraf, Markup } from 'telegraf';
import { PaymentCrypto } from 'payment-crypto';

const bot = new Telegraf('BOT_TOKEN');
const payment = new PaymentCrypto('CRYPTO_PAY_TOKEN', {
  mode: 'testnet',
});

bot.start(async (ctx) => {
  try {
    const invoice = await payment.createInvoice({
      currency_type: 'fiat',
      amount: 5,
      asset: 'USD',
    });
    await ctx.reply(
      '💎',
      Markup.inlineKeyboard([
        Markup.button.url('Pay', invoice.bot_invoice_url),
        Markup.button.callback(
          'Check payment',
          'checkPayment-' + invoice.invoice_id
        ),
      ])
    );
  } catch (error) {
    console.error(error);
  }
});

bot.action(/checkPayment/, async (ctx) => {
  try {
    const [method, invoiceID] = ctx.callbackQuery.data.split('-');
    const invoice = await payment.getInvoice(invoiceID);
    if (invoice.status == 'paid') {
      await ctx.answerCbQuery('✅', { show_alert: true });
      await ctx.deleteMessage().catch(() => {});
    } else {
      await ctx.answerCbQuery('❌', { show_alert: true });
    }
  } catch (error) {
    console.error(error);
  }
});

bot.launch();
```

```js [Grammy]
import { Bot, InlineKeyboard } from 'grammy';
import { PaymentCrypto } from 'payment-crypto';

const bot = new Bot('BOT_TOKEN');
const payment = new PaymentCrypto('CRYPTO_PAY_TOKEN', {
  mode: 'testnet',
});

bot.command('start', async (ctx) => {
  try {
    const invoice = await payment.createInvoice({
      currency_type: 'fiat',
      amount: 5,
      asset: 'USD',
    });
    const keyboard = new InlineKeyboard()
      .url('Pay', invoice.bot_invoice_url)
      .row()
      .text('Check payment', 'checkPayment-' + invoice.invoice_id);
    await ctx.reply('💎', {
      reply_markup: keyboard,
    });
  } catch (error) {
    console.error(error);
  }
});

bot.callbackQuery(/checkPayment/, async (ctx) => {
  try {
    const [method, invoiceID] = ctx.callbackQuery.data.split('-');
    const invoice = await payment.getInvoice(invoiceID);
    if (invoice.status == 'paid') {
      await ctx.answerCallbackQuery('✅', { show_alert: true });
      await ctx.deleteMessage().catch(() => {});
    } else {
      await ctx.answerCallbackQuery('❌', { show_alert: true });
    }
  } catch (error) {
    console.error(error);
  }
});

bot.start();
```

```js [Opengram]
import { Opengram, Markup } from 'opengram';
import { PaymentCrypto } from 'payment-crypto';

const bot = new Opengram('BOT_TOKEN');
const payment = new PaymentCrypto('CRYPTO_PAY_TOKEN', {
  mode: 'testnet',
});

bot.start(async (ctx) => {
  try {
    const invoice = await payment.createInvoice({
      currency_type: 'fiat',
      amount: 5,
      asset: 'USD',
    });
    await ctx.reply(
      '💎',
      Markup.inlineKeyboard([
        Markup.urlButton('Pay', invoice.bot_invoice_url),
        Markup.callbackButton(
          'Check payment',
          'checkPayment-' + invoice.invoice_id
        ),
      ]).extra()
    );
  } catch (error) {
    console.error(error);
  }
});

bot.action(/checkPayment/, async (ctx) => {
  try {
    const [method, invoiceID] = ctx.callbackQuery.data.split('-');
    const invoice = await payment.getInvoice(invoiceID);
    if (invoice.status == 'paid') {
      await ctx.answerCbQuery('✅', { show_alert: true });
      await ctx.deleteMessage().catch(() => {});
    } else {
      await ctx.answerCbQuery('❌', { show_alert: true });
    }
  } catch (error) {
    console.error(error);
  }
});

bot.launch();
```

```js [Kiogram]
// Maybe there will be, maybe not
```

:::
