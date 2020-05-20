import AbstractComponent from './abstract-component.js';

export default class DayListContainer extends AbstractComponent {
  getTemplate() {
    return (
      `<ul class="trip-days"> </ul>`
    );
  }
}
