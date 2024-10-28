import { fleetData, oneShipData, shipCondition } from '../../types';

const playerShipsStructuring = (shipsData: oneShipData[], idOfUser: string) => {
  const fleetOfPlayer: fleetData = {
    ships: [],
    isDefeated: false,
    owner: idOfUser,
  };
  for (let i = 0; i < shipsData.length; i += 1) {
    const ship: shipCondition = { decks: [], isDead: false };
    for (let j = 0; j < shipsData[i].length; j += 1) {
      const newDeck = {
        x: shipsData[i].position.x + Number(!shipsData[i].direction) * j,
        y: shipsData[i].position.y + Number(shipsData[i].direction) * j,
        isHit: false,
      };
      ship.decks.push(newDeck);
    }
    fleetOfPlayer.ships.push(ship);
  }
  return fleetOfPlayer;
};
export { playerShipsStructuring };
