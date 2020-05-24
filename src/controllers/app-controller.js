import DayListContainerComponent from '../components/day-list-container.js';
import FilterController from '../controllers/filter-controller.js';
import InfoComponent from '../components/info-component.js';
import MenuComponent from '../components/menu-component.js';
import StatistiscComponent from '../components/statistics-component.js';
import TripController from '../controllers/trip-controller.js';
import {getStatistics} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';
import {MenuItem, HIDDEN_CLASS} from '../data.js';

export default class AppController {
  constructor(container, eventsModel, api, store) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._api = api;
    this._store = store;

    this._activeMenuItem = MenuItem.TABLE;

    this._infoComponent = new InfoComponent();
    this._statisticsComponent = new StatistiscComponent();

    this._tripController = null;

    this._updateEvents = this._updateEvents.bind(this);
    this._updateTotalInfo = this._updateTotalInfo.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._updateEvents);
    this._eventsModel.setFilterChangeHandler(this._updateEvents);
    this._eventsModel.setDataChangeHandler(this._updateTotalInfo);
  }

  init() {
    const tripControlElement = document.querySelector(`.trip-controls`);

    const menuItems = Object.values(MenuItem).map((item) => {
      return {
        name: item,
        active: item === this._activeMenuItem,
      };
    });

    const menu = new MenuComponent(menuItems);
    menu.setMenuChangeHandler(this._onMenuChange);
    render(tripControlElement, menu);

    const filterController = new FilterController(tripControlElement, this._eventsModel);

    const pageBodyMainElement = document.querySelector(`.page-main .page-body__container`);
    render(pageBodyMainElement, this._statisticsComponent, RenderPosition.BEFOREEND);

    const tripEventsElement = document.querySelector(`.trip-events`);
    render(tripEventsElement, new DayListContainerComponent());
    const daysListElement = tripEventsElement.querySelector(`.trip-days`);
    this._tripController = new TripController(daysListElement, this._eventsModel, this._api, this._store);

    const createNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
    createNewEventButton.addEventListener(`click`, () => {
      this._activeMenuItem = MenuItem.TABLE;
      menu.setDefault();
      this._statisticsComponent.hide();
      this._tripController.show();
      this._tripController.createNewEvent();
    });

    this._statisticsComponent.hide();
    filterController.render();
  }

  _onMenuChange(activeMenuItem) {
    if (this._activeMenuItem === activeMenuItem) {
      return;
    }
    this._activeMenuItem = activeMenuItem;
    switch (this._activeMenuItem) {
      case MenuItem.TABLE:
        document.querySelector(`.trip-filters__filter`).classList.remove(HIDDEN_CLASS);
        this._statisticsComponent.hide();
        this._tripController.show();
        break;
      case MenuItem.STATS:
        document.querySelector(`.trip-filters__filter`).classList.add(HIDDEN_CLASS);
        this._statisticsComponent.show();
        this._tripController.hide();
        this._tripController.onViewChange();
        break;
    }
  }

  _updateEvents() {
    this._tripController.updateEvents();
    this._statisticsComponent.rerender(getStatistics(this._eventsModel.getEventsAll(), this._store.createOffersList()));
    this._statisticsComponent.hide();
  }

  _updateTotalInfo() {
    this._infoComponent.setEvents(this._eventsModel.getEventsAll());

    const tripTotalPrice = document.querySelector(`.trip-info__cost-value`);
    tripTotalPrice.textContent = this._eventsModel.getEventsAll().reduce((totalPrice, it) => {
      return totalPrice + it.price + it.offers.reduce((totalOfferPrice, offer) => {
        return totalOfferPrice + offer.price;
      }, 0);
    }, 0);

    render(this._container, this._infoComponent, RenderPosition.AFTERBEGIN);
  }
}
