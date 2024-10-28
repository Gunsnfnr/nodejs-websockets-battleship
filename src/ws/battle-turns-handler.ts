import WebSocket, { WebSocketServer } from 'ws';
import { Attack, Message } from '../types';
import { games, sockets } from './const';
import { checkShotResult } from './utils/check-shot-result';
import { togglePlayer } from './utils/toggle-player';
import { sendWhoseTurnIsNext } from './send-whose-turn-is-next';
import { sendFinish } from './send-finish';
import { addToWinners } from './utils/add-to-winners';
import { sendWinnersToAllUsers } from './send-winners-to-all-users';

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
  if (shouldGameGoOn) {
    sendWhoseTurnIsNext(nextTurnIsFor, ws);
  } else {
    sendFinish(idOfUser, ws);
    addToWinners(idOfUser);
    sendWinnersToAllUsers();
  }

  sockets.forEach((socket) => {
    if (socket.idOfUser === togglePlayer(idOfUser, currentGame)) {
      socket.webSocket.send(attackFeedback);

      if (shouldGameGoOn) {
        sendWhoseTurnIsNext(nextTurnIsFor, socket.webSocket);
      } else {
        sendFinish(idOfUser, socket.webSocket);
      }
    }
  });
};

export { battleHandler };
