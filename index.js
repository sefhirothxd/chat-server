import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { PORT } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
  },
});
app.use(morgan('dev'));
// indica que el servidor puede recibir informacon
io.on('connection', (socket) => {
  console.log(socket.id);
  // escucha el evento chat:message
  socket.on('chat:message', (message) => {
    console.log(message);
    // envia el mensaje a todos los clientes conectados
    socket.broadcast.emit('chat:message', {
      body: message,
      from: socket.id,
    });
  });
});

server.listen(PORT, () => console.log('Server is running on port ' + PORT));
