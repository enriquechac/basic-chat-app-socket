const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)  => {
    res.json({
        message: 'Hello World🖐🖐😂',
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
  });



  //Web Sockets
const io = require("socket.io")(server);

io.on("connection", socket => {
    // either with send()
    socket.send("Hello!");
    console.log("New connection ", socket.id);

    socket.on('chat:message', (data) => {
        socket.broadcast.emit('server:chat:message', data);
        console.log(data);
    });

    socket.on('chat:join', (data) => {
        socket.broadcast.emit('server:chat:join', data);
        console.log(data);
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

