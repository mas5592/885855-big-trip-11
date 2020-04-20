import {createElement} from '../utils';

const createFilterMarkup = (filter, isChecked) => {
  return `<div class="trip-filters__filter">
    <input
      id="filter-everything"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter}" ${isChecked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">${filter}</label>
  </div>`;
};

export const createFiltersBigTripTemplate = (filters) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter, i) => createFilterMarkup(filter, i === 0)).join(`\n`)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTempate() {
    return createFiltersBigTripTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTempate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
