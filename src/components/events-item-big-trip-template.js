import {formatTime, formatDurationTime} from '../utils';
import {TYPE_POINTS_ACTIVITY} from '../data';
import AbstractComponent from './abstract.js';

export default class EventsItem extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    const {
      endDate,
      location,
      price,
      startDate,
      type,
    } = this._event;

    const timeEnd = formatTime(endDate);
    const timeStart = formatTime(startDate);
    const timeDuration = endDate - startDate;
    const action = TYPE_POINTS_ACTIVITY.some((pretexts) => type === pretexts) ? `in` : `to`;

    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLocaleLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${action} ${location}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T11:00">${timeStart}</time>
             &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
        </p>
        <p class="event__duration">${formatDurationTime(timeDuration)}</p>
      </div>
      <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;
          &euro;<span class="event__offer-price">${price}</span>
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`.trim();
  }
}
