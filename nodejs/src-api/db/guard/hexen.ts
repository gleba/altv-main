import {newRune} from '~shared/rune'
import {existsSync, readFileSync, writeFileSync,} from 'fs'


const crypto = require('crypto')

const hexenFile = './data/.hexen'
let hexenKeys

if (existsSync(hexenFile)) {
  hexenKeys = JSON.parse(readFileSync(hexenFile).toString())
} else {
  hexenKeys = [newRune(16), newRune(8)]
  writeFileSync(hexenFile, JSON.stringify(hexenKeys))
}
const [hexenKey, initVector] = hexenKeys
const algorithm = 'aes-256-cbc'
const encode = 'hex'


export const hexen = {
  encrypt(data: any, key?: string): string {
    if (!key) key = hexenKey
    const cipher = crypto.createCipheriv(algorithm, key, initVector)
    let encryptedData = cipher.update(JSON.stringify(data), 'utf8', encode)
    encryptedData += cipher.final(encode)
    return encryptedData
  },
  decrypt(encryptedData: string, key?: string): any {
    if (!key) key = hexenKey
    const decipher = crypto.createDecipheriv(algorithm, key, initVector)
    try {
      let decrypted = decipher.update(encryptedData, encode, 'utf8')
      decrypted += decipher.final()
      return JSON.parse(decrypted)
    } catch (e) {
      return null
    }
  }
}
