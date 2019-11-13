import { BStore } from '../storage'
import {IoCheckAuthRune, IoSyncFlow} from '~shared/io.channels'
import { TUserStore } from '~api/db/TUserStore'
import { Socket } from 'socket.io'
import { hexen } from '~api/db/guard/hexen'


export class UserController {
  public actions({ actions, dynamique }: BStore) {
    let socket: Socket
    return {
      new(s: Socket) {
        socket = s
        console.log("[user] new")

        socket.on('disconnect', x => dynamique.SoulController.removeById(this.id))
      },
      sync(flow, name, data){
        console.log("sync", flow, name, )
        socket.emit(IoSyncFlow, [flow, name, data])
      }
    }
  }
}
