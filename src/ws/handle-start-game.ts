import WebSocket from 'ws';
import { Game, Message, shipsData } from '../types';
import { playerShipsStructuring } from './utils/player-ships-structuring';
import { games } from './const';

const handleStartGame = (incomingData: Message, ws: WebSocket) => {
  const { gameId, ships, indexPlayer }: shipsData = JSON.parse(incomingData.data);

  let currentGame: Game = games.find((game) => gameId === game.gameId)!;

  const newShipsData = playerShipsStructuring(ships, indexPlayer);

  if (currentGame.player1 === indexPlayer) {
    currentGame.player1fleet.push(newShipsData);
  } else currentGame.player2fleet.push(newShipsData);

  const responseToStart = JSON.stringify({
    type: 'start_game',
    data: JSON.stringify({
      ships,
      currentPlayerIndex: indexPlayer,
    }),
    id: 0,
  });

  ws.send(responseToStart);

  const response = JSON.stringify({
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: currentGame.player1,
    }),
    id: 0,
  });

  ws.send(response);
};

export { handleStartGame };
