import WebSocket from 'ws';
import crypto from 'node:crypto';
import { Room } from '../types';
import { sendUpdateRoom } from './send-update-room';
import { rooms } from './const';
import { isOtherEmptyRoomExist } from './utils/is-other-empty-room-exist';

const createRoom = (ws: WebSocket, nameOfUser: string, idOfUser: string, botMode?: boolean): void | string => {
  let roomId: string = '';

  if (!isOtherEmptyRoomExist(idOfUser)) {
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
    if (botMode) return roomId;
  }
};

export { createRoom };
