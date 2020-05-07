import PointController from './event-controller';
import DaylistContainer from '../components/day-list-container';
import DaysComponent from '../components/days-component';
import NoEventsComponent from '../components/no-events-component';
import SortComponent, {SortType} from '../components/sort-component';
import {render} from '../utils/render';
import {generateDates} from '../utils/time';

const getSortedEvents = (events, sortType) => {
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.PRICE:
      showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.TIME:
      showingEvents.sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
      break;
  }

  return showingEvents;
};

const renderDayСontainer = (container, dates = ``) => {
  container.innerHTML = ``;
  const days = new DaysComponent(dates);
  if (dates === ``) {
    days.getElement().querySelector(`.day__info`).innerHTML = ``;
  }
  render(container, days);

  return dates !== `` ? days.getElement().querySelectorAll(`.trip-events__list`) : days.getElement().querySelector(`.trip-events__list`);
};

const renderEvents = (events, container, onDataChange, onViewChange, points, types) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange, points, types);
    pointController.render(event);

    return pointController;
  });
};

const renderDefaultEvents = (events, trailDates, container, onDataChange, onViewChange, points, types) => {
  const tripEventsList = renderDayСontainer(container, trailDates);
  let controllers = [];
  for (let j = 0; j < tripEventsList.length; j++) {
    const dayEvents = events.filter((event) => event.startDate.getDate() === trailDates[j].day);
    controllers = [...controllers, ...renderEvents(dayEvents, tripEventsList[j], onDataChange, onViewChange, points, types)];
  }
  return controllers;
};

const renderSortedEvents = (sortedEvents, container, onDataChange, onViewChange, points, types) => {
  const tripEventsList = renderDayСontainer(container);
  return renderEvents(sortedEvents, tripEventsList, onDataChange, onViewChange, points, types);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._showedPointControllers = [];
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._dayListContainer = new DaylistContainer();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onViewChange = this._onViewChange.bind(this);

  }

  render(events, points, types) {
    const container = this._container;
    this._events = events;
    this._points = points;
    this._types = types;
    this._trailDates = generateDates(this._events);
    if (!this._events.length) {
      render(container, this._noEventsComponent);
    } else {
      render(container, this._sortComponent);
      render(container, this._dayListContainer);

      const tripDaysElement = this._dayListContainer.getElement();
      this._showedPointControllers = renderDefaultEvents(this._events, this._trailDates, tripDaysElement, this._onDataChange, this._onViewChange, this._points, this._types);
    }
  }
  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    const tripDaysElement = this._dayListContainer.getElement();
    if (sortType !== `event`) {
      this._showedPointControllers = renderSortedEvents(sortedEvents, tripDaysElement, this._onDataChange, this._onViewChange, this._points, this._types);
    } else {
      this._showedPointControllers = renderDefaultEvents(this._events, this._trailDates, tripDaysElement, this._onDataChange, this._onViewChange, this._points, this._types);
    }
  }

  _onDataChange(oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);
    const pointController = this._showedPointControllers.find((evt) => evt._eventComponent._event === oldData);
    if (index === -1) {
      return;
    }

    this._events = [...this._events.slice(0, index), newData, ...this._events.slice(index + 1)];
    pointController.render(this._events[index]);

  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }
}
