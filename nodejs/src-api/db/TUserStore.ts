import { AbstractLevel } from '~api/db/level.dts'
import { TeleUser } from '~shared/TeleUser'
import { newRune } from '~shared/rune'
import { backStore } from '~api/storage'
import { sessionRunes } from '~api/modules/SoulController'

const level = require('level')
const db = level('data/db.users.tg') as AbstractLevel


const authRunes = {} as {
  [rune: string]: {
    user: TeleUser,
    interval?: NodeJS.Timeout
  }
}



const grandUsers = {
  glebpw: true
}

const updateRolesForUser = user => {
  user.roles = {
    grand: grandUsers[user.username]
  }
}

export const TUserStore = {
  put(user: TeleUser): void {
    db.put(user.id, JSON.stringify(user))
  },
  async get(id: number): Promise<TeleUser | null> {
    return new Promise(done => {
      db.get(id, (err, jstr) => {
        if (jstr) {
          let user = JSON.parse(jstr) as TeleUser
          updateRolesForUser(user)
          done(user)
        } else done(null)
      })
    })
  },
  newRuneForAuthUser(user, rune) {
    const clientsNames = []
    sessionRunes.each(rune, sid=>{
      let soul = backStore.dynamique.SoulController.getById(sid)
      clientsNames.push(soul.actions.grandRune(user))
    })
    return clientsNames
  },
  newAuthRuneForUser(user): string {
    this.put(user)
    updateRolesForUser(user)
    let interval = setTimeout(() => {
      delete authRunes[rune]
    }, 24 * 60 * 1000)
    const rune = newRune(45)
    authRunes[rune] = {
      user,
      interval
    }
    return rune
  },
  haveAUserForRune(authRune: string): TeleUser | null {
    let v = authRunes[authRune]
    if (v) {
      clearInterval(v.interval)
      delete authRunes[authRune]
      return v.user
    } else {
      return null
    }
  }
}





