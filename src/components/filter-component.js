import AbstractComponent from './abstract-component';
import {FILTERS_DATA} from '../data';

const createFilterMarkup = (filter, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${isChecked === 0 ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  getTemplate() {
    const filterMarkup = FILTERS_DATA.map((i, isChecked) => createFilterMarkup(i, isChecked)).join(`\n`);
    return `<form class="trip-filters" action="#" method="get">
        ${filterMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
     .trim();
  }
}
