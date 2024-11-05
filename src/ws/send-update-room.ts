import WebSocket from 'ws';
import { rooms } from './const';

const sendUpdateRoom = (ws: WebSocket) => {
  const response = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0,
  });
  ws.send(response);
};
console.log('update_room');
export { sendUpdateRoom };
