import {TRAVEL_TRANSPORT} from '../data.js';
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

export const getChecked = (switchData) => {
  return (switchData) ? `checked` : ``;
};

export const getStatistics = (events, allTypes) => {
  const statistics = [];

  for (const [key] of allTypes) {
    const filteredEvents = events.filter((event) => event.type === key);

    statistics.push({
      type: key,
      totalPrice: filteredEvents.reduce((totalPrice, it) => totalPrice + it.price, 0),
      count: filteredEvents.length,
      totalTime: filteredEvents.reduce((totalTime, it) => totalTime + formatStatisticsTime(it.startDate, it.endDate), 0),
      transport: TRAVEL_TRANSPORT.some((it) => key === it)
    });
  }
  return statistics;
};

export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
