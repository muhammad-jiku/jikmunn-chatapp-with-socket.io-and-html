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
  socket.on('chat', (msg) => {
    io.emit('showChat', msg);
  });
});

expressServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
