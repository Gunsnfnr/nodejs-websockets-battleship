export interface Message {
  type: string;
  data: string;
  id: number;
}

export type LoginData = {
  name: string;
  password: string;
};
