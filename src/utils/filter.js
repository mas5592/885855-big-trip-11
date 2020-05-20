import {FilterType} from '../data.js';
import moment from 'moment';

export const getFilteredEvents = (events, filterType) => {
  const nowDate = moment().valueOf();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return events.filter(({startDate}) => moment(startDate).isAfter(nowDate, `day`));
    case FilterType.PAST:
      return events.filter(({endDate}) => moment(endDate).isBefore(nowDate, `day`));
  }
  return events;
};

