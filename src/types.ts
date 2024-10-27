export interface Message {
  type: string;
  data: string;
  id: number;
}

export type LoginData = {
  name: string;
  password: string;
};

export type Position = {
  x: number;
  y: number;
};

export interface oneShipData {
  position: Position;
  direction: boolean;
  type: 'huge' | 'large' | 'medium' | 'small';
  length: 1 | 2 | 3 | 4;
}

export interface shipsData {
  gameId: string;
  ships: oneShipData[];
  indexPlayer: string;
}

export interface RoomUser {
  name: string;
  index: string;
}

export interface Room {
  roomId: string;
  roomUsers: RoomUser[];
}
