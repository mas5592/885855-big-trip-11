import {AUTHORIZATION, END_POINT} from './data';
import {render, remove} from './utils/render';
import API from './api';
import Store from './store';
import APP from './controllers/app-controller';
import EventsModel from './models/points-model';
import LoadingComponent from './components/loading-component';

const tripInfoElement = document.querySelector(`.trip-info`);

const api = new API(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();

const store = new Store();
const appController = new APP(tripInfoElement, eventsModel, api, store);

const loadingComponent = new LoadingComponent();
const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.disabled = true;
render(document.querySelector(`.trip-events`), loadingComponent);

appController.init();

api.getData({url: `offers`})
  .then((offers) => store.setOffers(offers))
  .then(() => api.getData({url: `destinations`}))
  .then((destinations) => store.setDestinations(destinations))
  .then(() => api.getEvents())
  .then((events) => {
    eventsModel.setEvents(events);
    remove(loadingComponent);
    eventAddBtn.disabled = false;
  });
