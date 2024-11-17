import { Cell, shipCondition } from '../../types';
import { isCellInField } from './is-cell-in-field';

const getCellsAroundDeadShip = (ship: shipCondition): Cell[] => {
  const emptyCells: Cell[] = [];
  const maxWidth: number = ship.direction ? 1 : ship.length;
  const maxHeight: number = ship.direction ? ship.length : 1;

  const cellIsOutOfShip = (cellX: number, cellY: number): boolean => {
    let isOut = true;
    ship.decks.forEach((deck) => {
      if (deck.x === cellX && deck.y === cellY) isOut = false;
    });
    return isOut;
  };

  for (let i = ship.decks[0].x - 1; i <= ship.decks[0].x + maxWidth; i += 1) {
    for (let j = ship.decks[0].y - 1; j <= ship.decks[0].y + maxHeight; j += 1) {
      if (isCellInField(i, j) && cellIsOutOfShip(i, j)) emptyCells.push({ x: i, y: j });
    }
  }
  return emptyCells;
};

export { getCellsAroundDeadShip };
