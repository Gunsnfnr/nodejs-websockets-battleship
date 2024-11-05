import WebSocket from 'ws';
import { ShotStatus } from '../types';

const sendAttackFeedback = (xFire: number, yFire: number, idOfUser: string, shotStatus: ShotStatus, ws: WebSocket) => {
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
  console.log('attack', 'shotStatus: ', shotStatus);
};
export { sendAttackFeedback };
