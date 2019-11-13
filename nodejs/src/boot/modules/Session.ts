import {holistic, La, qubit, stored} from 'lasens'

import {IoCheckAuthRune, IoCheckGrandRune, ClientRuneLength, IoGrandRune, IoSyncFlow} from '~shared/io.channels'
import {newRune} from '~shared/rune'

import io from 'socket.io-client';
import {XStore} from "~/boot";
import SocketIO, {Socket} from "socket.io";

const host = process.env.DEV ? "http://localhost:5678" : "/"

export class Session {
  @stored sessionRune = newRune(ClientRuneLength)
  @qubit @stored grandRune: string
  //
  @stored @qubit user: any

  actions({f}: La<Session>, {actions, flows}: XStore) {
    let socket: Socket
    f.sessionRune.up(sessionRune => {
      let url = host + '?rune=' + sessionRune
      socket = io(url);
    })

    f.grandRune.up(grandRune =>
      socket.emit(IoCheckGrandRune, grandRune,
        user => user
          ? f.user(user)
          : actions.session.logout()
      ))

    return {
      checkAuthRune(authRune) {
        return new Promise(done =>
          socket.emit(IoCheckAuthRune, authRune, done))
      },
      logout() {
        f.user.clearValue()
        f.grandRune.clearValue()
        f.sessionRune.clearValue() //(newRune(ClientRuneLength))
        window.location.reload()
      },
      start() {
        socket.on('connect', () => {
          console.log('connected')
        })
        socket.on(IoGrandRune, f.grandRune)
        socket.on(IoSyncFlow, ([moduleName, flowName, data]) => {
          let fm = flows[moduleName]
          if (fm) {
            // console.log(fm.id)
            let flow = fm[flowName]
            console.log(flow.id)

            if (flow) flow(data)
          }
        })
      }
    }
  }
}
