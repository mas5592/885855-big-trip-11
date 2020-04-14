const createFilterMurkup = (filter, isChecked) => {
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
      ${filters.map((filter, i) => createFilterMurkup(filter, i === 0)).join(`\n`)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
