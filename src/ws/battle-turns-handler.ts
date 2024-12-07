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
import { getRandomShotCoordinates } from './utils/get-random-shot-coordinates';

const battleHandler = (incomingData: Message, currentPlayer: string, ws: WebSocket, botId?: string) => {
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
    [xFire, yFire] = getRandomShotCoordinates();
  }

  let nextTurnIsFor: string;

  const processTurnOf = (idOfUser: string) => {
    const [shotStatus, shouldGameGoOn, emptyCells] = checkShotResult(xFire, yFire, gameId, idOfUser);

    sendAttackFeedback(xFire, yFire, idOfUser, shotStatus, ws);
    let nextTurnIsFor = idOfUser;

    if (shotStatus === 'killed') {
      emptyCells.forEach((cell) => {
        sendAttackFeedback(cell.x, cell.y, idOfUser, 'miss', ws);
      });
      if (idOfUser === botId) {
        [xFire, yFire] = getRandomShotCoordinates();
        return processTurnOf(botId);
      }
    }

    if (shotStatus === 'miss') {
      nextTurnIsFor = togglePlayer(idOfUser, currentGame);
    }

    if (shotStatus === 'shot' && idOfUser === botId) {
      [xFire, yFire] = getRandomShotCoordinates();
      return processTurnOf(botId);
    }

    if (shouldGameGoOn) {
      sendWhoseTurnIsNext(nextTurnIsFor, ws);
    } else {
      sendFinish(idOfUser, ws);
      if (!botId) addToWinners(idOfUser);
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
  nextTurnIsFor = processTurnOf(idOfUser);

  if (nextTurnIsFor === botId) {
    [xFire, yFire] = getRandomShotCoordinates();
    nextTurnIsFor = processTurnOf(botId);
  }
  return nextTurnIsFor;
};

export { battleHandler };
