import WebSocket from 'ws';
import { Message } from '../types';
import { rooms, sockets } from './const';
import { removeRoomFromAvailableRooms } from './utils/remove-room-from-available-rooms';
import { sendCreateGame } from './utils/send-create-game';

const createGame = (userData: Buffer, ws: WebSocket, guestUser: string) => {
  let hostUserId = '';
  let gameId = '';
  const incomingData: Message = JSON.parse(userData.toString());

  const roomId = JSON.parse(incomingData.data).indexRoom;

  rooms.forEach((room, roomIndex) => {
    if (room.roomId === roomId) {
      gameId = crypto.randomUUID();

      sendCreateGame(gameId, guestUser, ws);

      hostUserId = room.roomUsers[0].index;

      sockets.forEach((socket) => {
        if (socket.idOfUser === hostUserId) sendCreateGame(gameId, hostUserId, socket.webSocket);
      });

      removeRoomFromAvailableRooms(roomIndex);
    }
  });
};

export { createGame };
