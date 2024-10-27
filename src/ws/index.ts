import WebSocket, { WebSocketServer } from 'ws';
import { handleRegResponse } from './handle-reg-response';
import { handleCreateRoom } from './handle-create-room';
import { Message } from '../types';
import { sendUpdateRoom } from './utils/send-update-room';
import { createGame } from './create-game';

const startWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', (ws: WebSocket) => {
    let nameOfUser: string;
    let idOfUser: string;
    ws.on('message', (userData: Buffer) => {
      const incomingData: Message = JSON.parse(userData.toString());

      if (incomingData.type === 'reg') [nameOfUser, idOfUser] = handleRegResponse(userData, ws);

      if (incomingData.type === 'create_room') handleCreateRoom(userData, ws, nameOfUser, idOfUser);

      if (incomingData.type === 'add_user_to_room') createGame(userData, ws, idOfUser);

      wss.clients.forEach((client) => {
        sendUpdateRoom(client);
      });
    });

    ws.onerror = function () {
      console.log('An error occurred');
    };

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('The WebSocket server is running on port 3000');
};

export { startWss };
