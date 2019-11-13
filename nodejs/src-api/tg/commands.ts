import { newRune } from '~shared/rune'
import { bot } from '~api/tg/index'
import { Message } from 'node-telegram-bot-api'
import { frontUrl } from '~api/db/constants'
import { TUserStore } from '~api/db/TUserStore'
import { ClientRuneLength } from '~shared/io.channels'

const https = require('https')
const fs = require('fs')


const getUser = async msg => {
  const id = msg.from.id
  let user = await TUserStore.get(id)
  let isNewUser = !user
  console.log("[TG]", {isNewUser})
  // const inProfile = await bot.getUserProfilePhotos(id)

  // let photoId = 'none'
  // let photoLink = ''
  // if (inProfile.total_count > 0) {
  //   let sizes = inProfile.photos[0]
  //   let photo = sizes[sizes.length - 1]
  //   photoId = photo.file_id
  // }
  // const haveAPhoto = photoId != 'none'
  // const newPhoto = haveAPhoto && user && user.lastPhotoId != photoId
  //
  // if (haveAPhoto || newPhoto) {
  //   const url = await bot.getFileLink(photoId)
  //   photoLink = '/static/teleavatars/' + newRune(7) + '.jpg'
  //   const file = fs.createWriteStream('.' + photoLink)
  //   https.get(url, response => response.pipe(file))
  //   if (user) {
  //     user.lastPhotoId = photoId
  //     user.photoLink = photoLink
  //   }
  // }
  let userFields = {
    // photoLink,
    // lastPhotoId: photoId,
    first_name: msg.from.first_name,
    last_name: msg.from.last_name,
    username: msg.from.username,
    lang: msg.from.language_code
  }
  if (!user) {
    user = Object.assign(userFields, {
      id: id,
      activityList: []
    }) as any
  }

  user.activityList.push(new Date().getTime())
  TUserStore.put(user)
  return [user, isNewUser]
}


export const commands = {
  async '/start'(msg: Message) {
    let [user, isNewUser] = await getUser(msg)
    let rune = msg.text.split(' ')[1]
    console.log("[TG] /start", msg.from.username, rune && rune.length)
    if (rune && rune.length == ClientRuneLength) {
      let where = TUserStore.newRuneForAuthUser(user, rune)
      console.log(msg.chat.id)
      bot.sendMessage(msg.chat.id, `Успешная авторизация 
Вернитесь на сайт в браузере :
${where.map(v=>'- '+v)}`, {
        parse_mode: "Markdown",
        disable_notification: true,
      })
    }
  },
  async 'войти'(msg: Message) {
    let [user, isNewUser] = await getUser(msg)
    let rune = TUserStore.newAuthRuneForUser(user)
    let greetings = isNewUser ? 'Привет!\n' : 'С возвращением!\n'
    await bot.sendMessage(msg.chat.id, greetings + frontUrl + '/auth/' + rune + ' \n - ссылка для входа будет доступна в течении 2 минут.')
  }
}

