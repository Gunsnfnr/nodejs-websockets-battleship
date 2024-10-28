import { sockets } from './const';
import { sendWinners } from './send-winners';

const sendWinnersToAllUsers = () => {
  sockets.forEach((client) => {
    sendWinners(client.webSocket);
  });
};
export { sendWinnersToAllUsers };
