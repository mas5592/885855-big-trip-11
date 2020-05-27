import moment from 'moment';
import {MILLISECONDS_IN_SECOND, MINUTES_IN_HOUR, HOURS_IN_DAY} from '../data.js';

export const formatTime = (date) => moment(date).format(`HH:mm`);

export const formatDateTimeAttr = (date) => moment(date).format();

export const formatDateTime = (date) => moment(date).format(`YYYY MMM DD`);

export const formatInfoDateTime = (date) => moment(date).format(`DD MMM`);

export const formatStatisticsTime = (time1, time2) => moment(time2).diff(moment(time1), `hours`);

export const formatDateWithoutTime = (dateString) => moment(dateString, `YYYY MMM DD`).valueOf();

export const castInterval = (timeValue) => {
  return timeValue < 10 ? `0${timeValue}` : String(timeValue);
};

export const formatDurationTime = (begin, end) => {
  let minutesInt = (end - begin) / (MILLISECONDS_IN_SECOND * MINUTES_IN_HOUR);
  let daysInt;
  let hoursInt;
  let result = ``;
  if (minutesInt >= HOURS_IN_DAY * MINUTES_IN_HOUR) {
    daysInt = castInterval(Math.floor(minutesInt / (MINUTES_IN_HOUR * HOURS_IN_DAY)));
    minutesInt = minutesInt % (MINUTES_IN_HOUR * HOURS_IN_DAY);
    result += `${daysInt}D `;
  }
  if (minutesInt >= MINUTES_IN_HOUR) {
    hoursInt = castInterval(Math.floor(minutesInt / MINUTES_IN_HOUR));
    minutesInt = minutesInt % MINUTES_IN_HOUR;
    result += `${hoursInt}H `;
  }
  minutesInt = parseInt(castInterval(minutesInt), 10);
  result += `${minutesInt}M`;
  return result;
};
