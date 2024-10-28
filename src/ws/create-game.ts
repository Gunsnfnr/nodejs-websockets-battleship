import WebSocket from 'ws';
import { Message, Game } from '../types';
import { games, rooms, sockets } from './const';
import { removeRoomFromAvailableRooms } from './utils/remove-room-from-available-rooms';
import { sendCreateGame } from './utils/send-create-game';

const createGame = (userData: Buffer, ws: WebSocket, guestUser: string) => {
  let hostUserId = '';
  let gameId = '';
  const incomingData: Message = JSON.parse(userData.toString());

  const roomId = JSON.parse(incomingData.data).indexRoom;

  rooms.forEach((room, roomIndex) => {
    if (room.roomId === roomId) {
      hostUserId = room.roomUsers[0].index;

      if (hostUserId !== guestUser) {
        gameId = crypto.randomUUID();
        sendCreateGame(gameId, guestUser, ws);

        sockets.forEach((socket) => {
          console.log('createGame: socket: ', socket.idOfUser);
          if (socket.idOfUser === hostUserId) sendCreateGame(gameId, hostUserId, socket.webSocket);
        });

        removeRoomFromAvailableRooms(roomIndex);
        const newGame: Game = {
          gameId: gameId,
          player1: hostUserId,
          player2: guestUser,
          player1fleet: [],
          player2fleet: [],
        };
        games.push(newGame);
        console.log('newGame: ', newGame);
      }
    }
  });
};

export { createGame };
