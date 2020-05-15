import {formatStatisticsTime} from './time';
import {TypeRoutePoint} from '../data';

export const convertEvent = (event, offersAll) => {
  return Object.assign({}, event, {
    offers: offersAll.get(event.type).map((offer) => {
      return {
        title: offer.title,
        price: offer.price,
        checked: event.offers.some((el) => offer.title === el.title)
      };
    })
  });
};

export const getStatistics = (events, allTypes) => {
  const arr = [];

  for (const [key] of allTypes) {
    const filteredEvents = events.filter((event) => event.type === key);

    arr.push({
      type: key,
      totalPrice: filteredEvents.reduce((totalPrice, it) => totalPrice + it.price, 0),
      count: filteredEvents.length,
      totalTime: filteredEvents.reduce((totalTime, it) => totalTime + formatStatisticsTime(it.startDate, it.endDate), 0)
    });
  }
  return arr;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTypeRoutePoint = (routeType) => {
  let formattedTypeRoutePoint = ``;
  Object.keys(TypeRoutePoint).forEach((el) => {
    TypeRoutePoint[el].forEach((it) => {
      if (routeType === it && el === `TRANSFER`) {
        formattedTypeRoutePoint = `${capitalizeFirstLetter(routeType)} to`;
      } else if (routeType === `Check-in`) {
        formattedTypeRoutePoint = `${capitalizeFirstLetter(routeType).slice(0, 5)} into`;
      } else if (routeType === `Restaurant`) {
        formattedTypeRoutePoint = `${capitalizeFirstLetter(routeType)} in`;
      } else if (routeType === `Sightseeing`) {
        formattedTypeRoutePoint = `${capitalizeFirstLetter(routeType)} at`;
      }
    });
  });
  return formattedTypeRoutePoint;
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
  startDate: Date.now(),
  endDate: Date.now(),
  offers: [],
  price: 0,
  isFavorite: false
};
