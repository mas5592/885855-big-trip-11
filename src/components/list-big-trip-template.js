import AbstractComponent from './abstract.js';

export default class List extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days">
    </ul>`.trim();
  }
}
