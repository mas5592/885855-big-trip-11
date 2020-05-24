import moment from 'moment';

export const formatTime = (date) => moment(date).format(`HH:mm`);

export const formatDateTimeAttr = (date) => moment(date).format();

export const formatDateTime = (date) => moment(date).format(`YYYY MMM DD`);

export const formatInfoDateTime = (date) => moment(date).format(`DD MMM`);

export const formatStatisticsTime = (time1, time2) => moment(time2).diff(moment(time1), `hours`);

export const formatDateWithoutTime = (dateString) => moment(dateString, `YYYY MMM DD`).valueOf();

export const formatDurationTime = (time1, time2) => {
  const daysInt = moment(time2).diff(moment(time1), `days`);
  const hoursInt = moment(time2).diff(moment(time1), `hours`) - daysInt * 24;
  const minutesInt = moment(time2).diff(moment(time1), `minutes`) - daysInt * 60 * 24 - hoursInt * 60;

  const formattedInt = `${daysInt > 0 ? castInterval(daysInt, `D`) : ``} ${hoursInt > 0 ? castInterval(hoursInt, `H`) : ``} ${castInterval(minutesInt, `M`)}`;
  return formattedInt;
};

const castInterval = (timeValue, unitOfTime) => timeValue < 10 ? `0${timeValue}${unitOfTime}` : `${timeValue}${unitOfTime}`;
