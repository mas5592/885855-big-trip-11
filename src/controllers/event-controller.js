import EventsItemComponent from '../components/events-item-component';
import EventsComponent from '../components/events-component';
import {render, replace} from '../utils/render';
import {Mode} from '../mock/mode-mock';

const ESC_KEYCODE = 27;

export default class PointController {
  constructor(container, onDataChange, onViewChange, points, types) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._points = points;
    this._types = types;
    this._mode = Mode.DEFAULT;
    this._eventsItemComponent = null;
    this._eventsComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    const oldeventsItemComponent = this._eventsItemComponent;
    const oldEventsComponent = this._eventsComponent;

    this._eventsItemComponent = new EventsItemComponent(event);
    this._eventsComponent = new EventsComponent(event, this._points, this._types);

    this._eventsItemComponent.setClickHandler(() => {
      this._replaceEventToEdit();
      this._eventsComponent.reset();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventsComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventsComponent.setClickHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventsComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldEventsComponent && oldeventsItemComponent) {
      replace(this._eventsItemComponent, oldeventsItemComponent);
      replace(this._eventsComponent, oldEventsComponent);
    } else {
      render(this._container, this._eventsItemComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    this._eventsComponent.reset();
    replace(this._eventsItemComponent, this._eventsComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventsComponent, this._eventsItemComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.keyCode === ESC_KEYCODE || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
