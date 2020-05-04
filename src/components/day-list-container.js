import AbstractComponent from './abstract-component';

export default class DaylistContainer extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days"></ul>`.trim();
  }
}
