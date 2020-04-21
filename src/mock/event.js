import {
  getRandomOptions,
  PHOTOS,
  TYPE_CITY,
  TYPE_ITEMS,
  DESCRIPTIONS,
} from '../data';

import {shuffleArray} from '../utils';

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = (date) => {
  const selectedDate = new Date(date);
  const diffDays = getRandomIntegerNumber(0, 5);
  const diffMinutes = getRandomIntegerNumber(0, 90);

  selectedDate.setDate(selectedDate.getDate() + diffDays);
  selectedDate.setMinutes(selectedDate.getMinutes() + diffMinutes);

  return selectedDate;
};

export const generateEvent = () => {
  const startDate = getRandomDate(new Date());
  return {
    type: getRandomArrayItem(TYPE_ITEMS),
    location: TYPE_CITY.pop(),
    offers: shuffleArray(getRandomOptions()).slice(Math.random() * getRandomOptions().length),
    destinationDescription: shuffleArray(DESCRIPTIONS).slice(Math.random() * DESCRIPTIONS.length),
    destinationPhoto: shuffleArray(PHOTOS).slice(Math.random() * PHOTOS.length),
    startDate,
    endDate: getRandomDate(startDate),
    price: getRandomIntegerNumber(10, 1000),
    isFavorite: Math.random() > 0.5
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent)
    .sort((a, b) => a.startDate > b.startDate ? 1 : -1);
};
