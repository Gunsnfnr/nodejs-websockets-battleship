import WebSocket from 'ws';

const sendFinish = (winPlayer: string, ws: WebSocket) => {
  const response = JSON.stringify({
    type: 'finish',
    data: JSON.stringify({
      winPlayer,
    }),
    id: 0,
  });

  ws.send(response);
};

export { sendFinish };
