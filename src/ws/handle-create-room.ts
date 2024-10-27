import WebSocket from 'ws';
import crypto from 'node:crypto';
import { Room } from '../types';
import { sendUpdateRoom } from './send-update-room';

const handleCreateRoom = (userData: Buffer, ws: WebSocket, nameOfUser: string, rooms: Room[]): void => {
  const incomingData = JSON.parse(userData.toString());
  console.log('incomingData: ', incomingData);
  let playerId: string = '';
  let roomId: string = '';

  if (incomingData.type === 'create_room') {
    playerId = crypto.randomUUID();

    roomId = crypto.randomUUID();

    const newRoom: Room = {
      roomId: roomId,
      roomUsers: [
        {
          name: nameOfUser,
          index: playerId,
        },
      ],
    };
    rooms.push(newRoom);
    sendUpdateRoom(ws, rooms);
  }
};

export { handleCreateRoom };
