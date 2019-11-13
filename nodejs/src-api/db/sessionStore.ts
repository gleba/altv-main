import { AbstractLevel } from '~api/db/level.dts'
import { TeleUser } from '~shared/TeleUser'
import { newRune } from '~shared/rune'

const level = require('level')
const db = level('db.session') as AbstractLevel




export const sessionStore = {
  newForUser(user:TeleUser){
    const sid = newRune(16)
  },
  put(user: TeleUser): void {
    db.put(user.id, JSON.stringify(user))
  },
  async get(rune): Promise<TeleUser | null> {
    return new Promise(done => {
      db.get(rune, (err, jstr) => {
        if (jstr) {
          let user = JSON.parse(jstr) as TeleUser
          done(user)
        } else done(null)
      })
    })
  }
}
