const getRandomShotCoordinates = () => {
  const randomCoordinate = () => Math.floor(Math.random() * 10);
  return [randomCoordinate(), randomCoordinate()];
};
export { getRandomShotCoordinates };
