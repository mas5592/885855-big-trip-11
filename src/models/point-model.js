import moment from 'moment';

export default class Event {
  constructor(data) {
    this.id = data[`id`];
    this.price = data[`base_price`];
    this.startDate = moment(data[`date_from`]).valueOf();
    this.endDate = moment(data[`date_to`]).valueOf();
    this.destination = data[`destination`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`] || [];
    this.type = data[`type`];
  }

  toRAW() {
    return {
      'base_price': this.price,
      'date_to': moment(this.endDate).toISOString(),
      'date_from': moment(this.startDate).toISOString(),
      'destination': this.destination,
      'id': this.id,
      'is_favorite': this.isFavorite,
      'offers': this.offers,
      'type': this.type
    };
  }

  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }

  static clone(data) {
    return new Event(data.toRAW());
  }
}
