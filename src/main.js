import {
  createInfoBigTripTemplate
} from './components/info-big-trip-template';
import {
  createCostValueBigTripTemplate
} from './components/cost-value-big-trip-template';
import {
  createMenuBigTripTemplate
} from './components/menu-big-trip-template';
import {
  createFiltersBigTripTemplate
} from './components/filters-big-trip-template';
import {
  createSortBigTripTemplate
} from './components/sort-big-trip-template';
import {
  createEventsItemBigTripTemplate
} from './components/events-item-big-trip-template';
import {
  createEventsBigTripTemplate
} from './components/events-big-trip-template';

import {
  createListBigTripTemplate
} from './components/list-big-trip-template';
import {
  createDayBigTripTemplate
} from './components/day-big-trip-template';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const ROUTE_COUNT = 3;

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteEventsElement = document.querySelector(`.trip-events`);

render(siteMainElement, createInfoBigTripTemplate(), `afterBegin`);

const siteInfoElement = document.querySelector(`.trip-info`);

render(siteInfoElement, createCostValueBigTripTemplate(), `beforeEnd`);
render(siteControlsElement, createMenuBigTripTemplate(), `afterBegin`);
render(siteControlsElement, createFiltersBigTripTemplate(), `beforeEnd`);
render(siteEventsElement, createSortBigTripTemplate(), `beforeEnd`);
render(siteEventsElement, createEventsBigTripTemplate(), `beforeEnd`);
render(siteEventsElement, createListBigTripTemplate(), `beforeEnd`);

const siteDaysElement = document.querySelector(`.trip-days`);

render(siteDaysElement, createDayBigTripTemplate(), `beforeEnd`);

const siteListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < ROUTE_COUNT; i++) {
  render(siteListElement, createEventsItemBigTripTemplate(), `beforeend`);
}
