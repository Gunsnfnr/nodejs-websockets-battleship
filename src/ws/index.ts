import WebSocket, { WebSocketServer } from 'ws';
import { handleRegResponse } from './handleRegResponse';

const startWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (userData: Buffer) => {
      handleRegResponse(userData, ws);
    });
    ws.onerror = function () {
      console.log('An error occurred');
    };
  });
  console.log('The WebSocket server is running on port 3000');
};

export { startWss };
