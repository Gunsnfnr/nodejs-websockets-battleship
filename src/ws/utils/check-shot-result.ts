import { ShotStatus } from '../../types';
import { games } from '../const';
import { checkIfOtherShipsAreNotDead } from './check-if-other-ships-are-not-dead';

const checkShotResult = (
  xFire: number,
  yFire: number,
  gameId: string,
  shootingPlayer: string,
): [ShotStatus, boolean] => {
  let shotStatus: ShotStatus = 'miss';
  let shouldGameGoOn = true;
  const currentGame = games.find((game) => game.gameId === gameId)!;
  const victimPlayerFleet =
    shootingPlayer === currentGame.player1 ? currentGame.player2fleet : currentGame.player1fleet;

  const allShips = victimPlayerFleet[0].ships;
  for (let i = 0; i < allShips.length; i += 1) {
    const allDecks = allShips[i].decks;
    for (let j = 0; j < allDecks.length; j += 1) {
      if (xFire === allDecks[j].x && yFire === allDecks[j].y) {
        if (allDecks[j].isHit) {
          shotStatus = 'shot';
        } else {
          allDecks[j].isHit = true;

          if (allDecks.length === 1) {
            shotStatus = 'killed';
            allShips[i].isDead = true;
            shouldGameGoOn = checkIfOtherShipsAreNotDead(allShips);
          } else {
            const shipIsNotDead = allDecks.some((deck) => deck.isHit === false);
            shotStatus = shipIsNotDead ? 'shot' : 'killed';
            if (shotStatus === 'killed') {
              allShips[i].isDead = true;
              shouldGameGoOn = checkIfOtherShipsAreNotDead(allShips);
            }
          }
        }
        break;
      }
    }
  }
  return [shotStatus, shouldGameGoOn];
};
export { checkShotResult };
