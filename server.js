const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const expressServer = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  //   res.send('Helllo there!!');
  res.sendFile(__dirname + '/index.html');
});

expressServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
