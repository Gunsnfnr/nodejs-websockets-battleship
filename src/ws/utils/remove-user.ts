import { games, rooms, sockets, users } from '../const';
import { sendFinish } from '../send-finish';
import { addToWinners } from './add-to-winners';

const handleRemoveUser = (userId: string) => {
  users.splice(users.indexOf(userId), 1);

  sockets.forEach((socket, index) => {
    if (socket.idOfUser === userId) sockets.splice(index, 1);
  });

  rooms.forEach((room, index) => {
    if (room.roomUsers[0].index === userId) rooms.splice(index, 1);
  });

  let opponentId = '';
  games.forEach((game) => {
    if (userId === game.player1) {
      opponentId = game.player2;
    } else if (userId === game.player2) {
      opponentId = game.player1;
    }
  });
  if (opponentId) {
    sockets.forEach((socket) => {
      if (socket.idOfUser === opponentId) {
        sendFinish(opponentId, socket.webSocket);
        addToWinners(opponentId);
      }
    });
  }
};
export { handleRemoveUser };
