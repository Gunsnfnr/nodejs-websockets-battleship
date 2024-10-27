import WebSocket from 'ws';
import { Room } from '../types';

const sendUpdateRoom = (ws: WebSocket, rooms: Room[]) => {
  const response = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0,
  });
  ws.send(response);
};

export { sendUpdateRoom };
