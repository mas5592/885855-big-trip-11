import AbstractComponent from './abstract-component';

export default class InfoCost extends AbstractComponent {
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._price}</span>
    </p>`.trim();
  }
}
