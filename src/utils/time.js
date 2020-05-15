
import moment from 'moment';

export const formatTime = (date) => moment(date).format(`HH:mm`);

export const formatInfoDateTime = (date) => moment(date).format(`DD MMM`);

export const formatDateTime = (date) => moment(date).format(`YYYY MMM DD`);

export const formatDateWithoutTime = (dateString) => moment(dateString, `YYYY MMM DD`).valueOf();

export const formatStatisticsTime = (time1, time2) => moment(time2).diff(moment(time1), `hours`);

export const formatDurationTime = (timeDiff) => {
  const duration = moment.duration(timeDiff);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`;
};
