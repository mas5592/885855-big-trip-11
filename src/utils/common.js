import {TypeRoute} from '../data.js';
import {formatStatisticsTime} from './time';

export const convertEvent = (event, offersAll) => {
  return Object.assign({}, event, {offers: offersAll.get(event.type).map((offer) => {
    return {
      title: offer.title,
      price: offer.price,
      checked: event.offers.some((el) => offer.title === el.title)
    };
  })});
};

export const getStatistics = (events, allTypes) => {
  const arr = [];

  for (const [key] of allTypes) {
    const filteredEvents = events.filter((event) => event.type === key);

    arr.push({
      type: key,
      totalPrice: filteredEvents.reduce((totalPrice, it) => totalPrice + it.price, 0),
      count: filteredEvents.length,
      totalTime: filteredEvents.reduce((totalTime, it) => totalTime + formatStatisticsTime(it.startDate, it.endDate), 0),
      transport: TypeRoute.TRANSFER.some((it) => key === it)
    });
  }
  return arr;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTypeRoute = (typeRoute) => {
  let formattedTypeRoute = ``;
  Object.keys(TypeRoute).forEach((el) => {
    TypeRoute[el].forEach((it) => {
      if (typeRoute === it && el === `TRANSFER`) {
        formattedTypeRoute = `${capitalizeFirstLetter(typeRoute)} to`;
      } else if (typeRoute === `restaurant`) {
        formattedTypeRoute = `${capitalizeFirstLetter(typeRoute)} in`;
      } else if (typeRoute === `check-in`) {
        formattedTypeRoute = `${capitalizeFirstLetter(typeRoute).slice(0, 5)} into`;
      } else if (typeRoute === `sightseeing`) {
        formattedTypeRoute = `${capitalizeFirstLetter(typeRoute)} at`;
      }
    });
  });
  return formattedTypeRoute;
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const EmptyEvent = {
  type: `flight`,
  destination: {
    name: ``,
    description: ``,
    pictures: [{
      src: ``,
      description: ``
    }]
  },
  offers: [],
  startDate: Date.now(),
  endDate: Date.now(),
  price: 0,
  isFavorite: false
};
