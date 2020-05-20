import AbstractSmartComponent from './abstract-smart-component.js';
import {formatInfoDateTime} from '../utils/time.js';
import {generateTown} from '../utils/info.js';

export default class Info extends AbstractSmartComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    if (this._events.length === 0) {
      return `<div></div>`;
    }

    const startRouteDate = formatInfoDateTime(this._events[0].startDate);
    const endRouteDate = formatInfoDateTime(this._events[this._events.length - 1].endDate);

    const event = generateTown(this._events);
    const date = `${startRouteDate}&nbsp;&nbsp;&mdash;&nbsp;${endRouteDate}`;

    return `<div class="trip-info__main">
          <h1 class="trip-info__title">${event}</h1>
          <p class="trip-info__dates">${date}</p>
        </div>`;
  }

  recoveryListeners() { }

  setEvents(events) {
    this._events = events.slice().sort((a, b) => a.startDate - b.startDate);

    super.rerender();
  }
}
