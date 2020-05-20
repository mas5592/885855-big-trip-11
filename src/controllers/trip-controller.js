import {SortType, HIDDEN_CLASS} from '../data.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import NoEventsComponent from '../components/no-events-component.js';
import SortComponent from '../components/sort-component.js';
import DayComponent from '../components/days-component.js';
import EventController from './event-controller.js';
import {Mode as EventControllerMode, EmptyEvent} from '../utils/common.js';
import {formatDateTime, formatDateWithoutTime} from '../utils/time.js';

const renderEvents = (events, container, onDataChange, onViewChange, store, isSortedByDefault = true) => {
  const eventControllers = [];

  const dates = isSortedByDefault
    ? [...new Set(events.map((card) => formatDateTime(card.startDate)))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isSortedByDefault ? new DayComponent(formatDateWithoutTime(date), dateIndex + 1) : new DayComponent();

    events
      .filter((event) => {
        return isSortedByDefault ? formatDateTime(event.startDate) === date : event;
      })
      .forEach((event) => {
        const eventController = new EventController(
            day.getElement().querySelector(`.trip-events__list`),
            onDataChange,
            onViewChange,
            store
        );

        eventController.render(event, EventControllerMode.DEFAULT);
        eventControllers.push(eventController);
      });

    render(container, day);
  });

  return eventControllers;
};

export default class TripController {
  constructor(container, eventsModel, api, store) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._api = api;
    this._store = store;

    this._eventControllers = [];
    this._creatingEvent = null;

    this._activeSortType = SortType.EVENT;
    this._isSortedByDefault = true;

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
  }

  render() {
    const eventsAll = this._eventsModel.getEventsAll();

    if (eventsAll.length === 0) {
      if (this._sortComponent) {
        remove(this._sortComponent);
        this._sortComponent = null;
      }
      render(this._container, this._noEventsComponent);
      return;
    } else {
      remove(this._noEventsComponent);
    }

    if (!this._sortComponent) {
      const sortFilters = Object.values(SortType)
        .map((sortType) => {
          return {
            name: sortType,
            checked: sortType === this._activeSortType
          };
        });
      this._sortComponent = new SortComponent(sortFilters);
      render(this._container.parentElement, this._sortComponent, RenderPosition.AFTERBEGIN);
      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }

    this._onSortTypeChange(this._activeSortType);
  }

  createNewEvent() {
    if (this._creatingEvent) {
      this.onViewChange();
      return;
    }

    this.onViewChange();
    this._creatingEvent = new EventController(this._container.parentElement, this._onDataChange, this.onViewChange, this._store);
    if (this._noEventsComponent) {
      remove(this._noEventsComponent);
    }
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADD);
    this._eventControllers.push(this._creatingEvent);
  }

  hide() {
    this._container.parentElement.classList.add(HIDDEN_CLASS);
  }

  onViewChange() {
    this._eventControllers.forEach((it) => it.setDefaultView());
  }

  show() {
    this._container.parentElement.classList.remove(HIDDEN_CLASS);
  }

  updateEvents() {
    this._removeEvents();
    this.render();
  }

  _removeEvents() {
    this._container.innerHTML = ``;
    this._eventControllers.forEach((_eventcontroller) => _eventcontroller.destroy());
    this._eventcontrollers = [];
  }

  _onDataChange(eventController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
        this._eventControllers.pop();
      } else {
        eventController.blockOnSave();
        this._api.createEvent(newData)
        .then((eventModel) => {
          this._eventsModel.addEvent(eventModel);
        })
        .catch(() => {
          eventController.shake();
        });
      }
    } else if (newData === null) {
      eventController.blockOnSave();
      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._eventsModel.removeEvent(oldData.id);
        })
        .catch(() => {
          eventController.shake();
        });
    } else {
      eventController.blockOnSave();
      this._api.updateEvent(oldData.id, newData)
      .then((eventModel) => {
        const isSuccess = this._eventsModel.updateEvent(oldData.id, eventModel);

        if (isSuccess) {
          eventController.render(eventModel, EventControllerMode.DEFAULT);
        }
      })
      .catch(() => {
        eventController.shake();
      });
    }
  }

  _onSortTypeChange(sortType) {
    this._activeSortType = sortType;

    let sortedEvents = [];
    const events = this._eventsModel.getEvents();

    switch (sortType) {
      case SortType.EVENT:
        this._isSortedByDefault = true;
        sortedEvents = events.slice();
        break;
      case SortType.TIME:
        this._isSortedByDefault = false;
        sortedEvents = events.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
        break;
      case SortType.PRICE:
        this._isSortedByDefault = false;
        sortedEvents = events.slice().sort((a, b) => b.price - a.price);
        break;
    }

    this._container.innerHTML = ``;
    this._eventControllers = renderEvents(sortedEvents, this._container, this._onDataChange, this.onViewChange, this._store, this._isSortedByDefault);
  }
}
