import {createElement} from '../utils';

import {TYPE_MONTHS} from '../data';

export const createDayBigTripTemplate = (date) => {
  const officialDate = new Date(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${officialDate.getDate()}</span>
        <time class="day__date" datetime="${date}">${TYPE_MONTHS[officialDate.getMonth()]} ${officialDate.getFullYear().toString().substr(-2)}</time>
      </div>
      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class TripDay {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createDayBigTripTemplate(this._date);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
