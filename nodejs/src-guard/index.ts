import * as NATS from 'nats'
import {Nns} from "../src-shared/NatsNamespace";
const dotenv = require('dotenv');
dotenv.config()

console.log("node guard micro-service", process.env.NATS_HOST)

const nats = NATS.connect({
  url: process.env.NATS_HOST,
  json: true
})

nats.subscribe("playerConnect", (...v) => {
  console.log(v)
})


const playersTrace = {}
nats.subscribe("playersPos", playersSpeed => {


  playersSpeed.forEach(({id, pos,health, vehicle}) => {
    let last = playersTrace[id]
    let data = { time : Date.now() } as any

    if (last) {
      const a = last.x - pos.x;
      const b = last.y - pos.y;
      const c = last.z - pos.z;
      const speedH = Math.sqrt(a * a + b * b);
      const speedV = Math.abs(last.z - pos.z)
      const speedA = Math.sqrt((a) ** 2 + (b) ** 2 + (c) ** 2)
      const speed = [speedA, speedV, speedH]
      data.speed = speed
      if (last.speed) {
        if (last.max) {
          data.max = speed.map((v, i) => Math.max(last.max[i], v))
        } else {
          data.max = speed.map((v, i) => Math.max(last.speed[i], v))
        }
        console.log(speed, data.max, health, vehicle)
      }
    }

    playersTrace[id] = Object.assign(pos, data)
  })

  nats.publish(Nns.PLAYERS_SPEED, playersSpeed)
})

