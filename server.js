const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const port = process.env.PORT || 5000;
const expressServer = http.createServer(app);

const io = new Server(expressServer);

app.use(express.json());

app.get('/', (req, res) => {
  //   res.send('Helllo there!!');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // socket.on('chat', (msg) => {
  //   io.emit('showChat', msg);
  // });

  // creating room
  socket.join('myRoom');
  let sizeOfMyRoom = io.sockets.adapter.rooms.get('myRoom').size;
  io.sockets.in('myRoom').emit('read', 'hola =' + sizeOfMyRoom);
  io.sockets.in('myRoom').emit('nap', 'do not disturb i am napping');

  // creating room
  socket.join('myDaughterRoom');
  let sizeOfMyDaughterRoom =
    io.sockets.adapter.rooms.get('myDaughterRoom').size;
  io.sockets
    .in('myDaughterRoom')
    .emit('study', 'hola papa! = ' + sizeOfMyDaughterRoom);
  io.sockets.in('myDaughterRoom').emit('sleep', 'I am tired!');
});

expressServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
