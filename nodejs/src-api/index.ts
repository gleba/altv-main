const dotenv = require('dotenv');
dotenv.config()


import {dynamique} from './storage'
console.log("∴")
const express = require('express')
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);


const port = process.env.NODE_ENV === 'production' ? 80 : 5678
console.log("try listen port:", port)
server.listen(port)

var expressStaticGzip = require("express-static-gzip");
app.use(require('cors')())
app.use('/static', express.static('static'));
app.use('/', expressStaticGzip('dist/spa'));

app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});


const compression = require('compression')
app.use(compression())

// console.log("app routes ✓")
io.origins('*:*')
io.on('connection', dynamique.SoulController)
// console.log("io ✓")
import './tg'
console.log("✓")


