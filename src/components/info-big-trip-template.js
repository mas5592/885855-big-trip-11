import {createElement} from '../utils';

export const createInfoBigTripTemplate = (point, days) => {

  const date = `${days.length ? `${days[0].month} ${days[0].day}&nbsp;&nbsp;&mdash;&nbsp;${days[0].month !== days[days.length - 1].month ? days[days.length - 1].month : ``} ${days[days.length - 1].day}` : ``}`;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${point}</h1>
        <p class="trip-info__dates">${date}</p>
      </div>
    </section>`
  );
};

export default class Info {
  constructor(point, days) {
    this._point = point;
    this._days = days;
    this._element = null;
  }

  getTemplate() {
    return createInfoBigTripTemplate(this._point, this._days);
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
