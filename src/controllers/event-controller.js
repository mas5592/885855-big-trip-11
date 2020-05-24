import {ESC_KEYCODE, ConnectBtnText, Timeout} from '../data.js';
import EventModel from '../models/event-model';
import EventItemComponent from '../components/event-item-component.js';
import EventEditComponent from '../components/event-component.js';
import {render, replace, remove} from '../utils/render.js';
import {Mode, EmptyEvent} from '../utils/common.js';

const FILTER_DIGITS_RANGE = /^\d*\.?\d*$/;

export default class EventController {
  constructor(container, onDataChange, onViewChange, store) {
    this._container = container;

    this._store = store;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._event = {};
    this._mode = Mode.DEFAULT;

    this._eventItemComponent = null;
    this._eventEditComponent = null;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onDeleteBtnClick = this._onDeleteBtnClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }

  render(event, mode) {
    this._event = event;
    this._mode = mode;

    const oldEventItemComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventItemComponent = new EventItemComponent(event, this._mode);
    this._eventEditComponent = new EventEditComponent(event, this._mode, this._store);

    this._eventInputPrice = this._eventEditComponent.getElement().querySelector(`.event__input--price`);
    this._filterDigitInput(this._eventInputPrice);

    this._eventItemComponent.setArrowHandler(() => {
      this._replaceItemToEdit();
      document.addEventListener(`keydown`, this._onEscPress);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      this._onFormSubmit(evt, this._mode);
    });

    this._eventEditComponent.setDeleteBtnClickHandler(() => {
      this._onDeleteBtnClick(this._mode);
    });

    this._eventEditComponent.setFavoriteBtnClickHandler(() => {
      const newEvent = EventModel.clone(event);
      newEvent.isFavorite = !newEvent.isFavorite;
      this._onDataChange(this, event, newEvent);

      this._mode = Mode.EDIT;
    });

    switch (this._mode) {
      case Mode.DEFAULT:
        this._eventEditComponent.setCancelBtnClickHandler(() => this._replaceEditToItem());

        if (oldEventItemComponent && oldEventEditComponent) {
          replace(this._eventItemComponent, oldEventItemComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToItem();
        } else {
          render(this._container, this._eventItemComponent);
        }
        break;

      case Mode.ADD:
        document.addEventListener(`keydown`, this._onEscPress);
        const tripSortElement = document.querySelector(`.trip-sort`);
        if (tripSortElement) {
          document.querySelector(`.trip-sort`).after(this._eventEditComponent.getElement());
        } else {
          render(this._container, this._eventEditComponent);
        }
        break;
    }
  }

  blockOnSave() {
    this._eventEditComponent.blockElement();
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToItem();
    }
  }

  shake() {
    this._eventEditComponent.blockElement(true);

    setTimeout(() => {
      this._eventEditComponent.setDefaultBtnText();
    }, Timeout.SHAKE_ANIMATION);
  }

  _filterDigitInput(textBlock) {
    [`input`, `keydown`, `keyup`, `mousedown`, `mouseup`, `select`, `contextmenu`, `drop`].forEach((event) => {
      textBlock.addEventListener(event, () => {
        if (FILTER_DIGITS_RANGE.test(textBlock.value)) {
          textBlock.oldValue = textBlock.value;
          textBlock.oldSelectionStart = textBlock.selectionStart;
          textBlock.oldSelectionEnd = textBlock.selectionEnd;
        } else if (!textBlock[`oldValue`]) {
          textBlock.value = ``;
        } else {
          textBlock.value = textBlock.oldValue;
          textBlock.setSelectionRange(textBlock.oldSelectionStart, textBlock.oldSelectionEnd);
        }
      });
    });
  }

  _onDeleteBtnClick(mode) {
    if (mode === Mode.ADD) {
      this._onDataChange(this, EmptyEvent, null);
    } else {
      this._eventEditComponent.setBtnText(`delete`, ConnectBtnText.DELETE);
      this._onDataChange(this, this._event, null);
    }
  }

  _replaceItemToEdit() {
    this._onViewChange();

    replace(this._eventEditComponent, this._eventItemComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToItem() {
    document.removeEventListener(`keydown`, this._onEscPress);
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
    this._eventEditComponent.reset();
    if (this._mode === Mode.ADD) {
      this._onDataChange(this, EmptyEvent, null);
    }
    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventItemComponent, this._eventEditComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onFormSubmit(evt, mode) {
    evt.preventDefault();
    this._eventEditComponent.setBtnText(`save`, ConnectBtnText.SAVE);
    const newData = this._eventEditComponent.getData();
    if (mode === Mode.ADD) {
      this._onDataChange(this, EmptyEvent, newData);
    } else {
      this._onDataChange(this, this._event, newData);
    }
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._replaceEditToItem();
    }
  }
}
