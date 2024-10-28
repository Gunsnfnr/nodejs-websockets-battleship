import WebSocket from 'ws';
import crypto from 'node:crypto';
import { Room } from '../types';
import { sendUpdateRoom } from './utils/send-update-room';
import { rooms } from './const';

const createRoom = (ws: WebSocket, nameOfUser: string, idOfUser: string): void => {
  let roomId: string = '';

  roomId = crypto.randomUUID();

  const newRoom: Room = {
    roomId: roomId,
    roomUsers: [
      {
        name: nameOfUser,
        index: idOfUser,
      },
    ],
  };
  rooms.push(newRoom);
  sendUpdateRoom(ws);
};

export { createRoom };
