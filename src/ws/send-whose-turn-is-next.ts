import WebSocket from 'ws';

const sendWhoseTurnIsNext = (playerId: string, ws: WebSocket) => {
  const response = JSON.stringify({
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: playerId,
    }),
    id: 0,
  });

  ws.send(response);
  console.log('turn');
};
export { sendWhoseTurnIsNext };
