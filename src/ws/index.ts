import WebSocket, { WebSocketServer } from 'ws';
import { handleRegResponse } from './handle-reg-response';
import { handleCreateRoom } from './handle-create-room';
import { Message, Room } from '../types';
import { sendUpdateRoom } from './send-update-room';

const startWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  // const users: string[] = [];
  // const rooms: Room[] = [];

  wss.on('connection', (ws: WebSocket) => {
    let nameOfUser: string;
    ws.on('message', (userData: Buffer) => {
      const incomingData: Message = JSON.parse(userData.toString());

      if (incomingData.type === 'reg') {
        nameOfUser = handleRegResponse(userData, ws);
      }

      handleCreateRoom(userData, ws, nameOfUser);
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
