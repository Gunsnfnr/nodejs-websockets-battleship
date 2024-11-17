import WebSocket, { WebSocketServer } from 'ws';
import { handleRegResponse } from './handle-reg-response';
import { createRoom } from './create-room';
import { Message } from '../types';
import { createGame } from './create-game';
import { handleStartGame } from './handle-start-game';
import { battleHandler } from './battle-turns-handler';
import { updateRoomsForAllUsers } from './utils/update-rooms-for-all-users';
import { sendWinnersToAllUsers } from './send-winners-to-all-users';
import { handleRemoveUser } from './utils/remove-user';

const startWss = () => {
  const wss = new WebSocketServer({ port: 3000 });
  let currentPlayer: string;

  wss.on('connection', (ws: WebSocket) => {
    let nameOfUser: string;
    let idOfUser: string;

    ws.on('message', (userData: Buffer) => {
      const incomingData: Message = JSON.parse(userData.toString());

      switch (incomingData.type) {
        case 'reg':
          [nameOfUser, idOfUser] = handleRegResponse(incomingData, ws);
          sendWinnersToAllUsers();
          break;

        case 'create_room':
          createRoom(ws, nameOfUser, idOfUser);
          updateRoomsForAllUsers();
          break;

        case 'add_user_to_room':
          createGame(userData, ws, idOfUser);
          updateRoomsForAllUsers();
          break;

        case 'add_ships':
          currentPlayer = handleStartGame(incomingData, ws);
          break;

        case 'attack':
          currentPlayer = battleHandler(incomingData, currentPlayer, ws);
          break;

        case 'randomAttack':
          currentPlayer = battleHandler(incomingData, currentPlayer, ws);
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
      handleRemoveUser(idOfUser);
      updateRoomsForAllUsers();
      sendWinnersToAllUsers();
    });
  });

  console.log('The WebSocket server is running on port 3000');
};

export { startWss };
