import WebSocket from 'ws';
import { rooms } from '../const';

const sendUpdateRoom = (ws: WebSocket) => {
  if (rooms.length > 0) console.log('rooms.roomUser`: ', rooms[0].roomUsers);

  const response = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0,
  });
  ws.send(response);
};

export { sendUpdateRoom };
