import { rooms } from '../const';

const removeRoomFromAvailableRooms = (roomIndex: number) => {
  rooms.splice(roomIndex, 1);
};

export { removeRoomFromAvailableRooms };
