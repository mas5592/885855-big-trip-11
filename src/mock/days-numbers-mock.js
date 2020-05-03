import {TYPE_MONTHS} from '../data';
import {getRandomArrayItem, getRandomIntegerNumber} from '../utils';

export const generateDaysNumber = () => {
  return {
    number: getRandomIntegerNumber(1, 31),
    month: getRandomArrayItem(TYPE_MONTHS)
  };
};

export const generateDaysNumbers = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateDaysNumber);
};
