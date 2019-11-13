(process as any).env["NTBA_FIX_319"] = 1 as any
import {commands} from '~api/tg/commands'

const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TG_BOT_TOKEN
if (!token) throw "need setup environment TG_BOT_TOKEN"
// const token = process.env.NODE_ENV === 'production'
//   ? '1045345663:AAGjOencRxpAiKpDaY1RMw0jxRGQtNHrWwY'
//   : '743018624:AAHcIuW1cuVRlb0V8g33nImRUYChV0JCOkM'

export const bot = new TelegramBot(token, {polling: true})
console.log("telegram bot borned")

bot.getMe().then(bot => {
  console.log("telegram bot:", bot.username)
})


bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"
  bot.sendMessage(chatId, resp)
})

bot.on('message', (msg) => {
  console.log('telegram bot message:', msg.text)
  const chatId = msg.chat.id
  const fn = commands[msg.text.toLowerCase().split(" ")[0]]
  if (fn) {
    fn(msg)
  } else {
    // bot.sendMessage(msg.chat.id, 'Доступна команда "войти"');
  }
})

