import Event from '../models/event-model';
import {nanoid} from 'nanoid';

const getSyncedEvents = (items) =>
  items.filter(({success}) =>
    success).map(({payload}) => payload.event);

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  getData({url}) {
    if (this._isOnLine()) {
      return this._api.getData({url})
        .then((data) => {
          this._store.setAppStoreData(data);
          return data;
        });

    }
    const appStoreData = Object.values(this._store.getAll());
    this._isSynchronized = false;

    return Promise.resolve(appStoreData);
  }

  getEvents() {
    if (this._isOnLine()) {
      return this._api.getEvents()
        .then((events) => {
          events.forEach((event) => this._store.setEvent(event.id, event.toRAW()));
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getAll());
    this._isSynchronized = false;

    return Promise.resolve(Event.parseEvents(storeEvents));
  }

  createEvent(event) {
    if (this._isOnLine()) {
      return this._api.createEvent(event)
        .then((newEvent) => {
          this._store.setEvent(newEvent.id, newEvent.toRAW());
          return newEvent;
        });
    }

    const fakeNewEventId = nanoid();
    const fakeNewEvent = Event.parseEvent(Object.assign({}, event.toRAW(), {id: fakeNewEventId}));
    this._store.setEvent(fakeNewEvent.id, Object.assign({}, fakeNewEvent.toRAW(), {offline: true}));
    this._isSynchronized = false;

    return Promise.resolve(fakeNewEvent);
  }

  updateEvent(id, event) {
    if (this._isOnLine()) {
      return this._api.updateEvent(id, event)
        .then((newEvent) => {
          this._store.setEvent(newEvent.id, newEvent.toRAW());
          return newEvent;
        });
    }

    const fakeUpdatedEvent = Event.parseEvent(Object.assign({}, event.toRAW(), {id}));
    this._store.setEvent(id, Object.assign({}, fakeUpdatedEvent.toRAW(), {offline: true}));
    this._isSynchronized = false;

    return Promise.resolve(fakeUpdatedEvent);
  }

  deleteEvent(id) {
    if (this._isOnLine()) {
      return this._api.deleteEvent(id)
        .then(() => {
          this._store.removeItem(id);
        });
    }

    this._store.removeItem(id);
    this._isSynchronized = false;

    return Promise.resolve();
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  sync() {
    if (this._isOnLine()) {
      const storeEvents = Object.values(this._store.getAll());

      return this._api.sync(storeEvents)
        .then((response) => {
          storeEvents.filter((event) => event.offline).forEach((event) => {
            this._store.removeItem(event.id);
          });

          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          [...createdEvents, ...updatedEvents].forEach((event) => {
            this._store.setEvent(event.id, event);
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
