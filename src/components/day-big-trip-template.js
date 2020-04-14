import {TYPE_MONTHS} from '../data';
import {createEventsItemBigTripTemplate} from './events-item-big-trip-template';

export const createDayBigTripTemplate = (date, events) => {
  const officialDate = new Date(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${officialDate.getDate()}</span>
        <time class="day__date" datetime="${date}">${TYPE_MONTHS[officialDate.getMonth()]} ${officialDate.getFullYear().toString().substr(-2)}</time>
      </div>
      <ul class="trip-events__list">
        ${events.map((event) => createEventsItemBigTripTemplate(event))}
      </ul>
    </li>`
  );
};


