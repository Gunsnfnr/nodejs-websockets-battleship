import { shipCondition } from '../../types';

const checkIfOtherShipsAreNotDead = (allShips: shipCondition[]) => {
  let shouldGameGoOn = true;
  const isFleetNotDead = allShips.some((ship) => ship.isDead === false);
  if (!isFleetNotDead) shouldGameGoOn = false;
  return shouldGameGoOn;
};
export { checkIfOtherShipsAreNotDead };
