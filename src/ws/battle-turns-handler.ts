import WebSocket, { WebSocketServer } from 'ws';
import { Attack, Message } from '../types';
import { games, sockets } from './const';
import { checkShotResult } from './utils/check-shot-result';
import { togglePlayer } from './utils/toggle-player';
import { sendWhoseTurnIsNext } from './utils/send-whose-turn-is-next';
import { sendFinish } from './utils/send-finish';

const battleHandler = (incomingData: Message, ws: WebSocket) => {
  const { x: xFire, y: yFire, gameId, indexPlayer: idOfUser }: Attack = JSON.parse(incomingData.data);
  const [shotStatus, shouldGameGoOn] = checkShotResult(xFire, yFire, gameId, idOfUser);
  const currentGame = games.find((game) => game.gameId === gameId)!;

  const attackFeedback = JSON.stringify({
    type: 'attack',
    data: JSON.stringify({
      position: {
        x: xFire,
        y: yFire,
      },
      currentPlayer: idOfUser,
      status: shotStatus,
    }),
    id: 0,
  });
  ws.send(attackFeedback);

  let nextTurnIsFor = idOfUser;
  if (shotStatus === 'miss') {
    nextTurnIsFor = togglePlayer(idOfUser, currentGame);
  }

  sendWhoseTurnIsNext(nextTurnIsFor, ws);

  sockets.forEach((socket) => {
    if (socket.idOfUser === togglePlayer(idOfUser, currentGame)) {
      socket.webSocket.send(attackFeedback);

      sendWhoseTurnIsNext(nextTurnIsFor, socket.webSocket);
    }
  });
};

export { battleHandler };
