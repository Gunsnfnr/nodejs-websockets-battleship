import WebSocket from 'ws';
import { Message } from '../types';
import { games, sockets } from './const';
import { checkShotResult } from './utils/check-shot-result';
import { togglePlayer } from './utils/toggle-player';
import { sendWhoseTurnIsNext } from './send-whose-turn-is-next';
import { sendFinish } from './send-finish';
import { addToWinners } from './utils/add-to-winners';
import { sendWinnersToAllUsers } from './send-winners-to-all-users';
import { sendAttackFeedback } from './send-attack-feedback';

const battleHandler = (incomingData: Message, currentPlayer: string, ws: WebSocket) => {
  const parsedData = JSON.parse(incomingData.data);
  let xFire: number;
  let yFire: number;
  const gameId: string = parsedData.gameId;
  const idOfUser: string = parsedData.indexPlayer;

  const currentGame = games.find((game) => game.gameId === gameId)!;
  if (currentPlayer !== idOfUser) return togglePlayer(idOfUser, currentGame);

  if (incomingData.type === 'attack') {
    xFire = JSON.parse(incomingData.data).x;
    yFire = JSON.parse(incomingData.data).y;
  } else {
    xFire = Math.floor(Math.random() * 10);
    yFire = Math.floor(Math.random() * 10);
  }

  const [shotStatus, shouldGameGoOn, emptyCells] = checkShotResult(xFire, yFire, gameId, idOfUser);

  sendAttackFeedback(xFire, yFire, idOfUser, shotStatus, ws);
  if (shotStatus === 'killed') {
    emptyCells.forEach((cell) => {
      sendAttackFeedback(cell.x, cell.y, idOfUser, 'miss', ws);
    });
  }

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
      sendAttackFeedback(xFire, yFire, idOfUser, shotStatus, socket.webSocket);
      if (shotStatus === 'killed') {
        emptyCells.forEach((cell) => {
          sendAttackFeedback(cell.x, cell.y, idOfUser, 'miss', socket.webSocket);
        });
      }

      if (shouldGameGoOn) {
        sendWhoseTurnIsNext(nextTurnIsFor, socket.webSocket);
      } else {
        sendFinish(idOfUser, socket.webSocket);
      }
    }
  });
  return nextTurnIsFor;
};

export { battleHandler };
