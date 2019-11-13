import {backStore, BStore} from '../storage'
import {IoCheckAuthRune, IoCheckGrandRune, IoGrandRune} from '~shared/io.channels'
import {TUserStore} from '~api/db/TUserStore'
import {Socket} from 'socket.io'
import {hexen} from '~api/db/guard/hexen'
import * as _ from 'lodash'
import {ABox} from '~shared/abox'

export const sessionRunes = ABox()
var parser = require('ua-parser-js');

export class SoulController {
  public actions({actions, dynamique}: BStore) {
    let socket: Socket
    let sessionRune: string

    let browserName
    const thisActions = {
      new(s: Socket) {
        socket = s
        const ua = parser(socket.handshake.headers['user-agent'])
        browserName = `${ua.browser.name} ${ua.browser.version}`

        sessionRune = socket.handshake.query.rune
        sessionRunes.push(sessionRune, this.id)

        socket.on(IoCheckGrandRune, async (grandRune, userReply) => {
          let sign = hexen.encrypt(sessionRune)
          const data = hexen.decrypt(grandRune, sign.slice(0, 32))
          if (data && sign == data.sign) {
            const user = await TUserStore.get(data.id)
            console.log("[soul] grand rune user ", user.username)
            dynamique.UserController.create(socket)
            userReply(_.pick(user, 'last_name', 'first_name', 'photoLink', 'activityList'))
          } else {
            console.log("[soul] grand rune user ILLEGAL")
            userReply(null)
          }
        })
        socket.on(IoCheckAuthRune, (authRune, grandRuneReply) => {
          let user = TUserStore.haveAUserForRune(authRune)
          if (user) {
            console.log("[soul] auth rune user:", user.username)
            thisActions.grandRune(user)
            grandRuneReply(true)
          } else {
            console.log("[soul] invalid auth rune")
            grandRuneReply(false)
          }
        })
        socket.on('disconnect', x => {
          sessionRunes.remove(sessionRune, this.id)
          dynamique.SoulController.removeById(this.id)
        })
      },
      grandRune(user) {
        console.log("[soul]: grandRune", user.username)
        let sign = hexen.encrypt(sessionRune)
        socket.emit(IoGrandRune, hexen.encrypt({
          id: user.id, sign
        }, sign.slice(0, 32)))
        return browserName
      }
    }
    return thisActions
  }
}
