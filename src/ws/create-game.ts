import WebSocket from 'ws';
import { Message, Game } from '../types';
import { games, rooms, sockets } from './const';
import { removeRoomFromAvailableRooms } from './utils/remove-room-from-available-rooms';
import { sendCreateGame } from './send-create-game';
import { removeEmptyRoomsOfThisPlayer } from './utils/remove-empty-rooms-of-this-player';

const createGame = (userData: Buffer, ws: WebSocket, guestUser: string, roomIdWithBot?: string) => {
  let hostUserId = '';
  let gameId = '';
  const incomingData: Message = JSON.parse(userData.toString());

  const roomId = roomIdWithBot || JSON.parse(incomingData.data).indexRoom;

  rooms.forEach((room, roomIndex) => {
    if (room.roomId === roomId) {
      hostUserId = room.roomUsers[0].index;

      if (hostUserId !== guestUser) {
        gameId = crypto.randomUUID();
        sendCreateGame(gameId, guestUser, ws);

        sockets.forEach((socket) => {
          if (socket.idOfUser === hostUserId) sendCreateGame(gameId, hostUserId, socket.webSocket);
        });

        removeRoomFromAvailableRooms(roomIndex);
        removeEmptyRoomsOfThisPlayer(guestUser);
        const newGame: Game = {
          gameId: gameId,
          player1: hostUserId,
          player2: guestUser,
          player1fleet: [],
          player2fleet: [],
        };
        games.push(newGame);
      }
    }
  });
  if (roomIdWithBot) return gameId;
};

export { createGame };
