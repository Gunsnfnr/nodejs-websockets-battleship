import { rooms } from '../const';

const isOtherEmptyRoomExist = (idOfUser: string): boolean => {
  let roomExists = false;
  rooms.forEach((room) => {
    if (room.roomUsers[0].index === idOfUser) {
      roomExists = true;
    }
  });

  return roomExists;
};

export { isOtherEmptyRoomExist };
