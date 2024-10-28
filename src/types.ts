import WebSocket from 'ws';

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

export interface SocketInterface {
  webSocket: WebSocket;
  nameOfUser: string;
  idOfUser: string;
}

export type Winner = {
  name: string;
  wins: number;
};

export type Game = {
  gameId: string;
  player1: string;
  player2: string;
  player1fleet: fleetData[];
  player2fleet: fleetData[];
};

export type shipPartsCondition = {
  x: number;
  y: number;
  isHit: boolean;
};

export interface shipCondition {
  decks: shipPartsCondition[];
  isDead: boolean;
  direction: boolean;
  length: 1 | 2 | 3 | 4;
}

export interface fleetData {
  ships: shipCondition[];
  isDefeated: boolean;
  owner: string;
}

export type Cell = {
  x: number;
  y: number;
};

export interface Attack {
  x: number;
  y: number;
  gameId: string;
  indexPlayer: string;
}

export type ShotStatus = 'miss' | 'killed' | 'shot';
