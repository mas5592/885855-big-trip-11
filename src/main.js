import InfoComponent from './components/info-big-trip-template';
import InfoCostComponent from './components/cost-value-big-trip-template';
import MenuComponent from './components/menu-big-trip-template';
import FilterComponent from './components/filters-big-trip-template';
import ListComponent from './components/list-big-trip-template';
import SortComponent from './components/sort-big-trip-template';

import {generateEvents} from './mock/event';

import {generateTown, generatePrice, generateDates} from './utils';
import {render, RenderPosition} from './utils/render.js';

import RoutesController from './controllers/events';

const EVENT_COUNT = 15;

const events = generateEvents(EVENT_COUNT);
const pointDates = generateDates(events);
const point = generateTown(events);
const eventsPrice = generatePrice(events);

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, new InfoComponent(point, pointDates), RenderPosition.AFTERBEGIN);

const tripControlsElement = document.querySelector(`.trip-controls`);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, new InfoCostComponent(eventsPrice), RenderPosition.BEFOREEND);

render(tripControlsElement, new MenuComponent(), RenderPosition.AFTERBEGIN);

render(tripControlsElement, new FilterComponent(), RenderPosition.BEFOREEND);


const tripEventsElement = document.querySelector(`.trip-events`);

const listComponent = new ListComponent();

const routesController = new RoutesController(listComponent);

render(tripEventsElement, listComponent, RenderPosition.BEFOREEND);
routesController.render(events);

render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
