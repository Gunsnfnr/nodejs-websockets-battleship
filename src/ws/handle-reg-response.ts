import WebSocket from 'ws';
import { LoginData, Message } from '../types';
import crypto from 'node:crypto';
import { sendUpdateRoom } from './send-update-room';
import { sockets, users } from './const';

const handleRegResponse = (incomingData: Message, ws: WebSocket): [string, string] => {
  let idOfUser = '';
  let loginData: LoginData;

  loginData = JSON.parse(incomingData.data);
  const nameOfUser = loginData.name;
  const password = loginData.password;
  let response = '';

  if (users.includes(nameOfUser)) {
    response = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: nameOfUser,
        index: '',
        error: true,
        errorText: `User with the name "${nameOfUser}" already exists`,
      }),
      id: 0,
    });
  } else {
    users.push(nameOfUser);
    idOfUser = crypto.randomUUID();

    response = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: loginData.name,
        index: idOfUser,
        error: false,
        errorText: '',
      }),
      id: 0,
    });

    sockets.push({
      webSocket: ws,
      nameOfUser: nameOfUser,
      idOfUser: idOfUser,
      password,
    });
  }

  ws.send(response);
  console.log('reg');
  sendUpdateRoom(ws);

  return [nameOfUser, idOfUser];
};

export { handleRegResponse };
