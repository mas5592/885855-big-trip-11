import {Method, SERVER_TIMEOUT} from '../data';
import EventModel from '../models/point-model';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getData({url}) {
    return this._load({url})
      .then((response) => response.json());
  }

  getEvents() {
    return this._load({url: `points`})
    .then((response) => response.json())
    .then(EventModel.parseEvents);
  }

  createEvent(event) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(event.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(EventModel.parseEvent);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return Promise.race([
      fetch(`${this._endPoint}/${url}`, {method, body, headers}),
      new Promise((resolve) => setTimeout(resolve, SERVER_TIMEOUT))
    ])
   .then(checkStatus)
   .catch((err) => {
     throw err;
   });
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(EventModel.parseEvent);
  }

  deleteEvent(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }
}
