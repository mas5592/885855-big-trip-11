import {ESC_KEYCODE, FILTER_DIGITS_RANGE, ConnectBtnText, Timeout} from '../data.js';
import EventModel from '../models/event-model.js';
import EventItemComponent from '../components/event-item-component.js';
import EventComponent from '../components/event-component.js';
import {render, replace, remove} from '../utils/render.js';
import {Mode, EmptyEvent} from '../utils/common.js';

export default class EventController {
  constructor(container, onDataChange, onViewChange, store) {
    this._container = container;

    this._store = store;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._event = {};
    this._mode = Mode.DEFAULT;

    this._eventItemComponent = null;
    this._eventComponent = null;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onDeleteBtnClick = this._onDeleteBtnClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }

  render(event, mode) {
    this._event = event;
    this._mode = mode;

    const oldEventItemComponent = this._eventItemComponent;
    const oldEventComponent = this._eventComponent;

    this._eventItemComponent = new EventItemComponent(event, this._mode);
    this._eventComponent = new EventComponent(event, this._mode, this._store);

    this._eventInputPrice = this._eventComponent.getElement().querySelector(`.event__input--price`);
    this._filterDigitInput(this._eventInputPrice);

    this._eventItemComponent.setArrowHandler(() => {
      this._replaceItemToEdit();
      document.addEventListener(`keydown`, this._onEscPress);
    });

    this._eventComponent.setSubmitHandler((evt) => {
      this._onFormSubmit(evt, this._mode);
    });

    this._eventComponent.setDeleteBtnClickHandler(() => {
      this._onDeleteBtnClick(this._mode);
    });

    switch (this._mode) {
      case Mode.DEFAULT:
        this._eventComponent.setCancelBtnClickHandler(() => this._replaceEditToItem());
        this._eventComponent.setFavoriteBtnClickHandler(() => {
          const newEvent = EventModel.clone(event);
          newEvent.isFavorite = !newEvent.isFavorite;
          this._onDataChange(this, event, newEvent);
        });

        if (oldEventItemComponent && oldEventComponent) {
          replace(this._eventItemComponent, oldEventItemComponent);
          replace(this._eventComponent, oldEventComponent);
          this._replaceEditToItem();
        } else {
          render(this._container, this._eventItemComponent);
        }
        break;

      case Mode.ADD:
        document.addEventListener(`keydown`, this._onEscPress);
        const tripSortElement = document.querySelector(`.trip-sort`);
        if (tripSortElement) {
          document.querySelector(`.trip-sort`).after(this._eventComponent.getElement());
        } else {
          render(this._container, this._eventComponent);
        }
        break;
    }
  }

  blockOnSave() {
    this._eventComponent.blockElement();
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToItem();
    }
  }

  shake() {
    this._eventComponent.blockElement(true);

    setTimeout(() => {
      this._eventComponent.setDefaultBtnText();
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
      this._eventComponent.setBtnText(`delete`, ConnectBtnText.DELETE);
      this._onDataChange(this, this._event, null);
    }
  }

  _replaceItemToEdit() {
    this._onViewChange();

    replace(this._eventComponent, this._eventItemComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToItem() {
    document.removeEventListener(`keydown`, this._onEscPress);
    this._eventComponent.reset();
    if (this._mode === Mode.ADD) {
      this._onDataChange(this, EmptyEvent, null);
    }
    if (document.contains(this._eventComponent.getElement())) {
      replace(this._eventItemComponent, this._eventComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onFormSubmit(evt, mode) {
    evt.preventDefault();
    this._eventComponent.setBtnText(`save`, ConnectBtnText.SAVE);
    const newData = this._eventComponent.getData();
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
