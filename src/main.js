import {AUTHORIZATION, END_POINT, StoreKey, StoreInfo} from './data';
import {render, remove} from './utils/render';
import API from './api/api.js';
import AppStore from './api/app-store.js';
import BackupStore from './api/backup-store.js';
import Provider from './api/provider.js';
import APP from './controllers/app-controller';
import EventsModel from './models/points-model';
import LoadingComponent from './components/loading-component';

const tripInfoElement = document.querySelector(`.trip-info`);

const api = new API(END_POINT, AUTHORIZATION);
const backupStore = new BackupStore(window.localStorage);
const apiWithProvider = new Provider(api, backupStore);

const eventsModel = new EventsModel();
const appStore = new AppStore();
const appController = new APP(tripInfoElement, eventsModel, apiWithProvider, appStore);

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
  });
