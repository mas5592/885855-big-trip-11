import TripInfoComponent from './components/info-big-trip-template';
import TripInfoCostComponent from './components/cost-value-big-trip-template';
import TripMenuComponent from './components/menu-big-trip-template';
import TripFilterComponent from './components/filters-big-trip-template';
import TripSortComponent from './components/sort-big-trip-template';
import TripEventsComponent from './components/events-big-trip-template';
import TripEventsItemComponent from './components/events-item-big-trip-template';
import TripListComponent from './components/list-big-trip-template';
import TripDayComponent from './components/day-big-trip-template';

import {generateFilters} from './mock/filter';
import {generateEvents} from './mock/event';

import {render, RenderPosition, genarateTown, genaratePrice, genarateDates} from './utils';

const EVENT_COUNT = 15;
const DISPLAY_EVENTS_START = 10;
const filters = generateFilters();

const events = generateEvents(EVENT_COUNT);

const pointDates = genarateDates(events);
const point = genarateTown(events);
const eventsPrice = genaratePrice(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, new TripInfoComponent(point, pointDates).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, new TripInfoCostComponent(eventsPrice).getElement(), RenderPosition.BEFOREEND);

render(tripControlsElement, new TripMenuComponent().getElement(), RenderPosition.AFTERBEGIN);

render(tripControlsElement, new TripFilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);

render(tripEventsElement, new TripListComponent().getElement(), RenderPosition.BEFOREEND);

const tripDaysElement = document.querySelector(`.trip-days`);

const renderEvent = (eventDayElement, event) => {
  const replaceEventToEdit = () => {
    eventDayElement.replaceChild(tripEventsComponent.getElement(), tripEventsItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    eventDayElement.replaceChild(tripEventsItemComponent.getElement(), tripEventsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      eventDayElement.replaceChild(tripEventsItemComponent.getElement(), tripEventsComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventsItemComponent = new TripEventsItemComponent(event);
  const openEditButton = tripEventsItemComponent.getElement().querySelector(`.event__rollup-btn`);

  openEditButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const tripEventsComponent = new TripEventsComponent(event);
  const closeEditButton = tripEventsComponent.getElement().querySelector(`.event__rollup-btn`);

  closeEditButton.addEventListener(`click`, () => {
    replaceEditToEvent();
  });

  render(eventDayElement, tripEventsItemComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventDay = (day, eventsDay) => {
  const tripDay = new TripDayComponent(day);
  const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);

  eventsDay.slice(0, showingEventsCount)
    .forEach((event) => {
      renderEvent(tripDayList, event);
    });

  render(tripDaysElement, tripDay.getElement(), RenderPosition.BEFOREEND);
};

let showingEventsCount = DISPLAY_EVENTS_START;
let eventsList = {};

events.slice(0, showingEventsCount)
  .forEach((event) => {
    const date = `${event.startDate.getFullYear()}-${event.startDate.getMonth() + 1}-${event.startDate.getDate()}`;

    if (eventsList.hasOwnProperty(date)) {
      eventsList[date].push(event);
    } else {
      eventsList[date] = [event];
    }
  });

for (let [key, value] of Object.entries(eventsList)) {
  renderEventDay(key, value);
}
