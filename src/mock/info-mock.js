import {TYPE_LOCATION, DESCRIPTIONS} from '../data';
import {getRandomIntegerNumber, shuffleArray} from '../utils/random';

const generateRandomPhotos = () => {
  const photosArray = [];
  for (let i = 0; i < getRandomIntegerNumber(0, 5); i++) {
    photosArray.push(`http://picsum.photos/248/152?r=${i + Math.random() * 100}`);
  }
  return photosArray;
};

export const generateInfoTown = () => {
  return TYPE_LOCATION.map((locationName) => {
    return {
      location: locationName,
      description: getRandomDescription(),
      photo: generateRandomPhotos()
    };
  });
};

const getRandomDescription = () => {
  return shuffleArray(DESCRIPTIONS).slice(Math.random() * DESCRIPTIONS.length);
};
