import {
  createInfoBigTripTemplate,
} from './components/info-big-trip-template';
import {
  createCostValueBigTripTemplate
} from './components/cost-value-big-trip-template';
import {
  createMenuBigTripTemplate,
} from './components/menu-big-trip-template';
import {
  createFiltersBigTripTemplate,
} from './components/filters-big-trip-template';
import {
  createSortingBigTripTemplate,
} from './components/sort-big-trip-template';
import {
  createEventsBigTripTemplate,
} from './components/events-big-trip-template';
import {
  createListBigTripTemplate,
} from './components/list-big-trip-template';
import {
  createDayBigTripTemplate,
} from './components/day-big-trip-template';

import {generateFilters} from './mock/filter';
import {generateEvents} from './mock/event';

const EVENT_COUNT = 15;
const DISPLAY_EVENTS_START = 10;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const filters = generateFilters();
const events = generateEvents(EVENT_COUNT);
const eventsPrice = events.reduce((acc, event) => {
  return acc + event.price.value;
}, 0);
const eventPoints = events.reduce((acc, event) => {
  acc.push({
    point: event.location,
    startDay: event.startDate,
    endDay: event.endDate,
  });
  return acc;
}, []);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, createInfoBigTripTemplate(eventPoints), `afterBegin`);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, createCostValueBigTripTemplate(eventsPrice), `beforeEnd`);
render(tripControlsElement, createMenuBigTripTemplate(), `afterBegin`);
render(tripControlsElement, createFiltersBigTripTemplate(filters), `beforeEnd`);
render(tripEventsElement, createSortingBigTripTemplate(), `beforeEnd`);
render(tripEventsElement, createEventsBigTripTemplate(events[0]), `beforeEnd`);
render(tripEventsElement, createListBigTripTemplate(), `beforeEnd`);

const tripDaysElement = document.querySelector(`.trip-days`);

let showingEventsCount = DISPLAY_EVENTS_START;
let eventsList = {};

events.slice(1, showingEventsCount)
  .forEach((event) => {
    const date = `${event.startDate.getFullYear()}-${event.startDate.getMonth() + 1}-${event.startDate.getDate()}`;

    if (eventsList.hasOwnProperty(date)) {
      eventsList[date].push(event);
    } else {
      eventsList[date] = [event];
    }
  });

for (let [key, value] of Object.entries(eventsList)) {
  render(tripDaysElement, createDayBigTripTemplate(key, value), `beforeEnd`);
}
