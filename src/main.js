import {AUTHORIZATION, END_POINT, StoreInfo, StoreKey} from './data.js';
import {render, remove} from './utils/render.js';
import API from './api/index.js';
import AppStore from './api/app-store.js';
import BackupStore from './api/backup-store.js';
import Provider from './api/provider.js';
import AppController from './controllers/app-controller.js';
import EventsModel from './models/events-model.js';
import LoadingComponent from './components/loading-component.js';
import ErrorComponent from './components/error-component.js';
import 'flatpickr/dist/flatpickr.css';

const tripInfoElement = document.querySelector(`.trip-info`);

const api = new API(END_POINT, AUTHORIZATION);
const backupStore = new BackupStore(window.localStorage);
const apiWithProvider = new Provider(api, backupStore);

const eventsModel = new EventsModel();
const appStore = new AppStore();
const appController = new AppController(tripInfoElement, eventsModel, apiWithProvider, appStore);

const loadingComponent = new LoadingComponent();
const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.disabled = true;
render(document.querySelector(`.trip-events`), loadingComponent);

appController.init();

backupStore.setStoreKey(StoreInfo.getStoreName(StoreKey.OFFERS));
apiWithProvider.getData({url: StoreKey.OFFERS})
  .then((offers) => appStore.setOffers(offers))
  .then(() => backupStore.setStoreKey(StoreInfo.getStoreName(StoreKey.DESTINATIONS)))
  .then(() => apiWithProvider.getData({url: StoreKey.DESTINATIONS}))
  .then((destinations) => appStore.setDestinations(destinations))
  .then(() => backupStore.setStoreKey(StoreInfo.getStoreName(StoreKey.POINTS)))
  .then(() => apiWithProvider.getEvents())
  .then((events) => {
    eventsModel.setEvents(events);
    remove(loadingComponent);
    eventAddBtn.disabled = false;
  })
  .catch((error) => {
    remove(loadingComponent);
    render(document.querySelector(`.trip-events`), new ErrorComponent(error));
  });
/*
window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});*/

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
