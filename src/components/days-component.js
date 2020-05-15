import AbstractComponent from './abstract-component.js';
import {formatInfoDateTime} from '../utils/time.js';

export default class TripDayItem extends AbstractComponent {
  constructor(day, dayCount) {

    super();
    this._day = day;
    this._dayCount = dayCount;
  }

  getTemplate() {
    const count = this._dayCount ? this._dayCount : ``;
    const date = this._day ? formatInfoDateTime(this._day) : ``;

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="2019-03-18">${date}</time>
        </div>
        <ul class="trip-events__list">

        </ul>
      </li>`
    );
  }
}
