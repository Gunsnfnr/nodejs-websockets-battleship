import { winners } from '../const';
import { Winner } from '../../types';
import { getUserNameByUserId } from './get-username-by-user-id';

const addToWinners = (userId: string) => {
  const nameOfUser = getUserNameByUserId(userId);
  const userInWinners = winners.filter((winner) => winner.name === nameOfUser);
  if (userInWinners.length === 0) {
    const newWinner: Winner = {
      name: nameOfUser,
      wins: 1,
    };
    winners.push(newWinner);
  } else {
    winners.forEach((winner) => {
      if (winner.name === nameOfUser) {
        winner.wins += 1;
      }
    });
  }
};
export { addToWinners };
