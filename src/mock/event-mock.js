import {
  PHOTOS,
  DESCRIPTIONS,
  TYPE_ITEMS
} from '../data';
import {getRandomOffers} from './offers-mock';
import {getRandomIntegerNumber, getRandomArrayItem, shuffleArray} from '../utils/random';

const getRandomDate = (date) => {
  const selectedDate = new Date(date);
  const diffDays = getRandomIntegerNumber(0, 2);
  const diffMinutes = getRandomIntegerNumber(0, 90);

  selectedDate.setDate(selectedDate.getDate() + diffDays);
  selectedDate.setMinutes(selectedDate.getMinutes() + diffMinutes);

  return selectedDate;
};

const generateEvent = (point) => {
  const startDate = getRandomDate(new Date());
  const type = getRandomArrayItem(TYPE_ITEMS);
  const info = getRandomArrayItem(point);
  return {
    type,
    offers: getRandomOffers(),
    destinationDescription: shuffleArray(DESCRIPTIONS).slice(Math.random() * DESCRIPTIONS.length),
    destinationPhoto: shuffleArray(PHOTOS).slice(Math.random() * PHOTOS.length),
    info,
    startDate,
    endDate: getRandomDate(startDate),
    price: getRandomIntegerNumber(10, 1000),
    isFavorite: Math.random() > 0.5
  };
};

export const generateEvents = (count, point) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent(point))
    .sort((a, b) => a.startDate > b.startDate ? 1 : -1);
};
