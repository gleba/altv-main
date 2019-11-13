import {holistic, La, qubit, stored} from 'lasens'


const host = process.env.DEV ? "http://localhost:5678" : "/"

export class ViCast {


  showNames = false

  actions({f}: La<ViCast>) {


    return {
    }
  }
}
