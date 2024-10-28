import WebSocket, { WebSocketServer } from 'ws';
import { handleRegResponse } from './handle-reg-response';
import { createRoom } from './create-room';
import { Message } from '../types';
import { createGame } from './create-game';
import { handleStartGame } from './handle-start-game';
import { battleHandler } from './battle-turns-handler';
import { updateRoomsForAllUsers } from './utils/update-rooms-for-all-users';

const startWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', (ws: WebSocket) => {
    let nameOfUser: string;
    let idOfUser: string;

    ws.on('message', (userData: Buffer) => {
      const incomingData: Message = JSON.parse(userData.toString());
      console.log('incomingData: ', incomingData);

      switch (incomingData.type) {
        case 'reg':
          [nameOfUser, idOfUser] = handleRegResponse(userData, ws);
          break;

        case 'create_room':
          createRoom(ws, nameOfUser, idOfUser);
          updateRoomsForAllUsers(wss);
          break;

        case 'add_user_to_room':
          createGame(userData, ws, idOfUser);
          updateRoomsForAllUsers(wss);
          break;

        case 'add_ships':
          handleStartGame(incomingData, ws);
          break;

        case 'attack':
          battleHandler(incomingData, ws);
          break;

        default:
          console.log('unknown type');
      }
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
