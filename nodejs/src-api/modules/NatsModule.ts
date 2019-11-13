import { BStore } from '../storage'

import * as NATS from 'nats'
import {Nns} from "~shared/NatsNamespace";

console.log("NATS_HOST1:", process.env.NATS_HOST)


const nats = NATS.connect({
  url: process.env.NATS_HOST,
  json: true
})



export class NatsModule {
  public actions({ actions, dynamique }: BStore) {
    return {
      connect() {
        nats.subscribe(Nns.PLAYERS_SPEED, pspeed=> {
          dynamique.UserController.broadcast.actions.sync("players", "speed", pspeed)
          }
        )
      }
    }
  }
}
