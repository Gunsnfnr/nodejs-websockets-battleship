import { sockets } from '../const';
import { sendUpdateRoom } from '../send-update-room';

const updateRoomsForAllUsers = () => {
  sockets.forEach((client) => {
    sendUpdateRoom(client.webSocket);
  });
};

export { updateRoomsForAllUsers };
