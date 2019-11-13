import alt from 'alt';
import NATS from 'nats'


const nats = NATS.connect({
  url: "nats://nats:4222",
  json: true
})

let players = []
alt.on('playerConnect', (player) => {
  player.spawn(0, 0, 72, 0);
  players.push(player)
  console.log("player connected", player.id)
  nats.publish('playerConnect', player, player.name);
});


alt.on('playerDisconnect', (player, reason) => {
  let messageText = `${player.name} has leaved the server becauseof ${reason}`
  alt.log(messageText);
  console.log("player Disconnect", player.id)
  players = players.filter(p => p.name != player.name)
});

setInterval(() => {
  let data = []
  players.forEach(player => {
    let vehicle = player.vehicle
    let o = {pos: player.pos, id: player.id, health: player.health}
    console.log("vehicle", vehicle)
    if (vehicle) {
      console.log(vehicle.id, vehicle.model)
      o.vehicle = {
        id: vehicle.id,
        model: vehicle.model
      }
    }
    data.push(o)
  });
  nats.publish('playersPos', data);
}, 500)


alt.createVehicle(4289813342, 10, 10, 72, 0, 0, 0)

console.log("✓1")
