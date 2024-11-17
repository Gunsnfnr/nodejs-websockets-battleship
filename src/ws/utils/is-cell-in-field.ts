import { field_size } from '../const';

const isCellInField = (cellX: number, cellY: number): boolean => {
  return cellX >= 0 && cellX <= field_size && cellY >= 0 && cellY <= field_size;
};
export { isCellInField };
