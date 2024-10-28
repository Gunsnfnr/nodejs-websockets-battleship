import WebSocket from 'ws';
import { winners } from './const';

const sendWinners = (ws: WebSocket) => {
  const response = JSON.stringify({
    type: 'update_winners',
    data: JSON.stringify(winners),
    id: 0,
  });
  ws.send(response);
};
export { sendWinners };
