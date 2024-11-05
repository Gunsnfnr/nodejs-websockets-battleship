import WebSocket from 'ws';

const sendCreateGame = (gameId: string, userId: string, ws: WebSocket) => {
  const response = JSON.stringify({
    type: 'create_game',
    data: JSON.stringify({
      idGame: gameId,
      idPlayer: userId,
    }),
    id: 0,
  });
  ws.send(response);
  console.log('create_game');
};
export { sendCreateGame };
