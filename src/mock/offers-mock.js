import {OFFERS} from '../data';
import {getRandomIntegerNumber} from '../utils/random';

export const getRandomOffers = () => {
  const currentOffers = [];

  for (let i = 0; i < getRandomIntegerNumber(0, 4); i++) {
    currentOffers.push(OFFERS[i]);
  }

  return currentOffers;
};


