import AbstractComponent from './abstract-component.js';

export default class Error extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="trip-events__msg">Loading error! Please try again later</p>`
    );
  }
}
