import { Game } from '../../types';

const togglePlayer = (whoseTurn: string, game: Game) => {
  let nextTurnIsFor = '';
  if (whoseTurn === game.player1) {
    nextTurnIsFor = game.player2;
  } else {
    nextTurnIsFor = game.player1;
  }
  return nextTurnIsFor;
};

export { togglePlayer };
