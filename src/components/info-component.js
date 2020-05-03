import AbstractComponent from './abstract-component';

export default class Info extends AbstractComponent {
  constructor(point, days) {
    super();
    this._point = point;
    this._days = days;
  }

  getTemplate() {
    const date = `${this._days.length ? `${this._days[0].month} ${this._days[0].day}&nbsp;&nbsp;&mdash;&nbsp;${this._days[0].month !== this._days[this._days.length - 1].month ? this._days[this._days.length - 1].month : ``} ${this._days[this._days.length - 1].day}` : ``}`;
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._point}</h1>
      <p class="trip-info__dates">${date}</p>
    </div>
  </section>`
  .trim();
  }
}

