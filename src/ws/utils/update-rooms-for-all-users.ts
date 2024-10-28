import { WebSocketServer } from 'ws';
import { sendUpdateRoom } from './send-update-room';

const updateRoomsForAllUsers = (wss: WebSocketServer) => {
  wss.clients.forEach((client) => {
    sendUpdateRoom(client);
  });
};

export { updateRoomsForAllUsers };
