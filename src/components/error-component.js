import AbstractComponent from './abstract-component.js';

export default class Error extends AbstractComponent {
  constructor(errorMessage) {
    super();
    this._errorMessage = errorMessage;
  }

  getTemplate() {
    return (
      `<p class="trip-events__msg">Loading error! Sorry, please try again.<br>Error code: ${this._errorMessage}</p>`
    );
  }
}
