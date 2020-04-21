import {createElement} from '../utils';

export const createListBigTripTemplate = () => {
  return (
    `<ul class="trip-days">
      </ul>`
  );
};

export default class List {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListBigTripTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
