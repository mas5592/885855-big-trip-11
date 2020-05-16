export default class Keep {
  constructor() {
    this._destinations = [];
    this._offers = [];
  }

  createDestinations() {
    return this._destinations;
  }

  createDestinationNames() {
    return [...new Set(this._destinations.map(({name}) => name))];
  }

  createOffersList() {
    return new Map(this._offers.map((el) => [el.type, el.offers]));
  }

  setDestinations(data) {
    this._destinations = data;
  }

  setOffers(data) {
    this._offers = data;
  }
}
