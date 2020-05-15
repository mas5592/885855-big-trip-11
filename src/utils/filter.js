import {FilterType} from '../data';
import moment from 'moment';

export const getEventsByFilter = (events, filterType) => {
  const nowDate = moment().valueOf();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.sort((a, b) => a.startDate - b.startDate);
    case FilterType.PAST:
      return events.filter(({endDate}) => moment(endDate).isBefore(nowDate, `day`));
    case FilterType.FUTURE:
      return events.filter(({startDate}) => moment(startDate).isAfter(nowDate, `day`));
  }
  return events;
};
