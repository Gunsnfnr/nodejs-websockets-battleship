import WebSocket, { WebSocketServer } from 'ws';

const startWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', (ws: WebSocket) => {
    console.log('ws: ', ws);
    ws.on('message', (data: Buffer) => {
      console.log('data: ', JSON.parse(data.toString()));
    });
    ws.onerror = function () {
      console.log('An error occurred');
    };
  });
  console.log('The WebSocket server is running on port 3000');
};

export { startWss };
