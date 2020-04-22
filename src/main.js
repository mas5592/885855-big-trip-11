import InfoComponent from './components/info-big-trip-template';
import InfoCostComponent from './components/cost-value-big-trip-template';
import MenuComponent from './components/menu-big-trip-template';
import FilterComponent from './components/filters-big-trip-template';
import SortComponent from './components/sort-big-trip-template';
import EventsComponent from './components/events-big-trip-template';
import EventsItemComponent from './components/events-item-big-trip-template';
import ListComponent from './components/list-big-trip-template';
import DayComponent from './components/day-big-trip-template';
import {generateEvents} from './mock/event';

import {render, RenderPosition, generateTown, generatePrice, generateDates} from './utils';

const EVENT_COUNT = 15;

const ESC_KEYCODE = 27;

const events = generateEvents(EVENT_COUNT);

const pointDates = generateDates(events);
const point = generateTown(events);

const eventsPrice = generatePrice(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, new InfoComponent(point, pointDates).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, new InfoCostComponent(eventsPrice).getElement(), RenderPosition.BEFOREEND);

render(tripControlsElement, new MenuComponent().getElement(), RenderPosition.AFTERBEGIN);

render(tripControlsElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

render(tripEventsElement, new ListComponent().getElement(), RenderPosition.BEFOREEND);

const tripDaysElement = document.querySelector(`.trip-days`);

const renderEvent = (eventDayElement, event) => {
  const replaceEventToEdit = () => {
    eventDayElement.replaceChild(tripEventsComponent.getElement(), tripEventsItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    eventDayElement.replaceChild(tripEventsItemComponent.getElement(), tripEventsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEYCODE || evt.key === `Esc`) {
      eventDayElement.replaceChild(tripEventsItemComponent.getElement(), tripEventsComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventsItemComponent = new EventsItemComponent(event);
  const openEditButton = tripEventsItemComponent.getElement().querySelector(`.event__rollup-btn`);

  openEditButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const tripEventsComponent = new EventsComponent(event);
  const closeEditButton = tripEventsComponent.getElement().querySelector(`.event__rollup-btn`);

  closeEditButton.addEventListener(`click`, () => {
    replaceEditToEvent();
  });

  render(eventDayElement, tripEventsItemComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventDay = (day, eventsDay) => {
  const tripDay = new DayComponent(day);
  const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);

  eventsDay.slice()
    .forEach((event) => {
      renderEvent(tripDayList, event);
    });

  render(tripDaysElement, tripDay.getElement(), RenderPosition.BEFOREEND);
};


let eventsList = {};

events.slice()
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
