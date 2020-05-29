import moment from 'moment';
import {MINUTES_IN_HOUR, HOURS_IN_DAY} from '../data.js';

export const formatDateTimeAttr = (date) => moment(date).format();

export const formatDateTime = (date) => moment(date).format(`YYYY MMM DD`);

export const formatInfoDateTime = (date) => moment(date).format(`DD MMM`);

export const formatStatisticsTime = (time1, time2) => moment(time2).diff(moment(time1), `hours`);

export const formatDateWithoutTime = (dateString) => moment(dateString, `YYYY MMM DD`).valueOf();

export const formatTime = (date, forForm = false) => {
  return forForm ? moment(date).format(`YYYY-MM-DDThh:mm`) : moment(date).format(`HH:mm`);
};

export const formatDurationTime = (time1, time2) => {
  const daysInt = moment(time2).diff(moment(time1), `days`);
  const hoursInt = moment(time2).diff(moment(time1), `hours`) - daysInt * HOURS_IN_DAY;
  const minutesInt = moment(time2).diff(moment(time1), `minutes`) - daysInt * MINUTES_IN_HOUR * HOURS_IN_DAY - hoursInt * MINUTES_IN_HOUR;

  const formattedInt = `${daysInt > 0 ? castInterval(daysInt, `D`) : ``} ${hoursInt > 0 ? castInterval(hoursInt, `H`) : ``} ${castInterval(minutesInt, `M`)}`;
  return formattedInt;
};

const castInterval = (timeValue, unitOfTime) => timeValue < 10 ? `0${timeValue}${unitOfTime}` : `${timeValue}${unitOfTime}`;
