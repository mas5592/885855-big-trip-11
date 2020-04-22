import AbstractComponent from './abstract.js';
import {createElement} from '../utils';
import {TYPE_MONTHS} from '../data';

export default class Day extends AbstractComponent {
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    const officialDate = new Date(this._date);
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${officialDate.getDate()}</span>
      <time class="day__date" datetime="${this._date}">${TYPE_MONTHS[officialDate.getMonth()]} ${officialDate.getFullYear().toString().substr(-2)}</time>
    </div>
    <ul class="trip-events__list">
    </ul>
  </li>`.trim();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
