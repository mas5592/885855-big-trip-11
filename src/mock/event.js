import {
  CURRENCY,
  EVENT_ACTION,
  TYPE_CITY,
  TYPE_ITEMS,
} from '../data';

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const selectedDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  selectedDate.setDate(selectedDate.getDate() + diffValue);

  return selectedDate;
};

const generateOfferList = () => {
  const result = [];
  const count = getRandomIntegerNumber(0, 5);

  for (let i = 0; i < count; i++) {
    result.push({
      title: `Add luggage`,
      price: getRandomIntegerNumber(1, 100),
      currency: `&plus;${getRandomArrayItem(CURRENCY)}`,
      isChecked: getRandomIntegerNumber(0, 2),
    });
  }

  return result;
};

const generateDestinationDescription = () => {
  const result = [];
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const count = getRandomIntegerNumber(1, 5);

  for (let i = 0; i < count; i++) {
    result.push(text);
  }

  return result;
};

const generateDestinationPhoto = () => {
  const result = [];
  const count = getRandomIntegerNumber(1, 5);

  for (let i = 1; i <= count; i++) {
    result.push(`img/photos/${i}.jpg`);
  }

  return result;
};

export const generateEvent = () => {
  const generateStartDate = getRandomDate();
  const generateEndDate = (date) => {
    const updateDate = new Date();
    updateDate.setDate(date.getDate() + getRandomIntegerNumber(1, 10));
    return updateDate;
  };

  return {
    type: getRandomArrayItem(TYPE_ITEMS),
    action: getRandomArrayItem(EVENT_ACTION),
    location: getRandomArrayItem(TYPE_CITY),
    locationList: TYPE_CITY,
    offers: generateOfferList(),
    destinationDescription: generateDestinationDescription(),
    destinationPhoto: generateDestinationPhoto(),
    startDate: generateStartDate,
    endDate: generateEndDate(generateStartDate),
    price: {
      value: getRandomIntegerNumber(10, 1000),
      currency: getRandomArrayItem(CURRENCY),
    },
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent)
    .sort((a, b) => a.startDate > b.startDate ? 1 : -1);
};
