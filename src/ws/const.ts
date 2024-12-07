import { Game, oneShipData, Room, SocketInterface, Winner } from '../types';

export const users: string[] = [];
export const rooms: Room[] = [];
export const winners: Winner[] = [];
export const sockets: SocketInterface[] = [];
export const games: Game[] = [];
export const field_size = 9;
export const botShips: oneShipData[] = [
  { position: { x: 5, y: 2 }, direction: true, type: 'huge', length: 4 },
  { position: { x: 2, y: 0 }, direction: false, type: 'large', length: 3 },
  { position: { x: 6, y: 7 }, direction: true, type: 'large', length: 3 },
  { position: { x: 6, y: 0 }, direction: false, type: 'medium', length: 2 },
  { position: { x: 0, y: 3 }, direction: true, type: 'medium', length: 2 },
  { position: { x: 2, y: 4 }, direction: false, type: 'medium', length: 2 },
  { position: { x: 2, y: 8 }, direction: false, type: 'small', length: 1 },
  { position: { x: 1, y: 6 }, direction: true, type: 'small', length: 1 },
  { position: { x: 7, y: 3 }, direction: true, type: 'small', length: 1 },
  { position: { x: 3, y: 6 }, direction: false, type: 'small', length: 1 },
];
