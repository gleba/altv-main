import {holistic, La, qubit, stored} from 'lasens'


const host = process.env.DEV ? "http://localhost:5678" : "/"

export class Players {
  list = []
  speed = []
  actions({f}: La<Players>) {


    return {
    }
  }
}
