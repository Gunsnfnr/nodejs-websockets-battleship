import WebSocket from 'ws';
import { LoginData, Message } from '../types';
import crypto from 'node:crypto';

const handleRegResponse = (userData: Buffer, ws: WebSocket): void => {
  let response = '';
  const incomingData: Message = JSON.parse(userData.toString());
  let loginData: LoginData;
  if (incomingData.type === 'reg') {
    loginData = JSON.parse(incomingData.data);
    console.log('loginData: ', loginData);

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

    ws.send(response);
  }
};

export { handleRegResponse };
