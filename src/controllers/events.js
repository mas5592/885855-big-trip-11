import {render, replace, RenderPosition} from '../utils/render';
import EventsComponent from '../components/events-big-trip-template';
import EventsItemComponent from '../components/events-item-big-trip-template';
import DayComponent from '../components/day-big-trip-template';

const ESC_KEYCODE = 27;

const renderEventDay = (day, eventsDay) => {
  const tripDaysElement = document.querySelector(`.trip-days`);
  const tripDay = new DayComponent(day);
  const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);

  eventsDay.slice()
    .forEach((event) => {
      renderEvent(tripDayList, event);
    });

  render(tripDaysElement, tripDay, RenderPosition.BEFOREEND);
};


const renderEvent = (eventDayElement, event) => {

  const replaceEventToEdit = () => {
    replace(tripEventsComponent, tripEventsItemComponent);
  };

  const replaceEditToEvent = () => {
    replace(tripEventsItemComponent, tripEventsComponent);
  };

  const tripEventsComponent = new EventsComponent(event);
  const tripEventsItemComponent = new EventsItemComponent(event);

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEYCODE || evt.key === `Esc`) {
      eventDayElement.replaceChild(tripEventsItemComponent.getElement(), tripEventsComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openEditButton = tripEventsItemComponent.getElement().querySelector(`.event__rollup-btn`);

   openEditButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const closeEditButton = tripEventsComponent.getElement().querySelector(`.event__rollup-btn`);

  closeEditButton.addEventListener(`click`, () => {
    replaceEditToEvent();
  });

  render(eventDayElement, tripEventsItemComponent);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._DayComponent = new DayComponent();
    this._eventsItemComponent = new EventsItemComponent();
    this._eventsComponent = new EventsComponent();
  }

  render(events) {
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
  }
}
