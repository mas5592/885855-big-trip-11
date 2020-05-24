import AbstractComponent from './abstract-component.js';
import {EmptyEvent, capitalizeFirstLetter, Mode} from '../utils/common.js';
import {formatTime, formatDateTimeAttr, formatDurationTime} from '../utils/time.js';
import {TRAVEL_TRANSPORT, Placeholder} from '../data.js';

export default class EventItem extends AbstractComponent {
  constructor(event, mode) {
    super();
    this._event = event;
    this._mode = mode;
  }

  getTemplate() {
    const {destination, endDate, offers, price, startDate} = this._event;
    const type = this._mode !== Mode.ADD ? this._event.type : EmptyEvent.type;

    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${capitalizeFirstLetter(type)} ${TRAVEL_TRANSPORT.includes(type) ? Placeholder.TRANSPORT : Placeholder.ACTION} ${destination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${formatDateTimeAttr(startDate)}">${formatTime(startDate)}</time>
              &mdash;
              <time class="event__end-time" datetime="${formatDateTimeAttr(endDate)}">${formatTime(endDate)}</time>
            </p>
            <p class="event__duration">${formatDurationTime(startDate, endDate)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">${offers.map(({title, price: offerPrice}) => {
        return (
          `<li class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
            </li>`
        );
      }).slice(0, 2).join(`\n`)}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  setArrowHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
