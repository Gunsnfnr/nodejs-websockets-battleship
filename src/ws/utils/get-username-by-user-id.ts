import { sockets } from '../const';

const getUserNameByUserId = (userId: string) => {
  return sockets.filter((socket) => socket.idOfUser === userId)[0].nameOfUser;
};
export { getUserNameByUserId };
