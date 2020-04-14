import {TYPE_MONTHS} from '../data';

const generatePointList = (points) => {
  return points.map((point) => point).join(` &mdash; `);
};

const genarateDates = (start, end) => {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.getMonth();

  return `${TYPE_MONTHS[startMonth]} ${startDay} &mdash; ${endDay}`;
};

export const createInfoBigTripTemplate = (points) => {
  const pointList = points.reduce((acc, point) => {
    acc.push(point.point);
    return acc;
  }, []);
  const startDay = points[0].startDay;
  const endDay = points[points.length - 1].endDay;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${generatePointList(pointList)}</h1>
        <p class="trip-info__dates">${genarateDates(startDay, endDay)}</p>
      </div>
    </section>`
  );
};
