import { rooms } from '../const';

const removeEmptyRoomsOfThisPlayer = (idOfUser: string): void => {
  rooms.forEach((room, index) => {
    if (room.roomUsers[0].index === idOfUser) {
      rooms.splice(index, 1);
    }
  });
};

export { removeEmptyRoomsOfThisPlayer };
