import WebSocket from 'ws';
import { LoginData, Message, Room } from '../types';
import crypto from 'node:crypto';
import { sendUpdateRoom } from './send-update-room';

const handleRegResponse = (userData: Buffer, ws: WebSocket, users: string[], rooms: Room[]): string => {
  let nameOfUser = '';
  const incomingData: Message = JSON.parse(userData.toString());
  let loginData: LoginData;

  loginData = JSON.parse(incomingData.data);
  nameOfUser = loginData.name;
  let response = '';

  if (users.includes(nameOfUser)) {
    response = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: nameOfUser,
        index: crypto.randomUUID(),
        error: true,
        errorText: `User with the name "${nameOfUser}" already exists`,
      }),
      id: 0,
    });
  } else {
    users.push(nameOfUser);

    response = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: loginData.name,
        index: crypto.randomUUID(),
        error: false,
        errorText: '',
      }),
      id: 0,
    });
  }

  ws.send(response);
  sendUpdateRoom(ws, rooms);

  return nameOfUser;
};

export { handleRegResponse };
