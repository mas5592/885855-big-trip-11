import AbstractComponent from './abstract-component.js';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return (
      `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
      ${this._filters.map(({name, checked}) => {
        return (
          `<input id="filter-${name}" data-filter="${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${checked ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>`
        );
      }).join(`\n`)}
      </div>
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
    );
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      handler(evt.target.dataset.filter);
    });
  }
}
