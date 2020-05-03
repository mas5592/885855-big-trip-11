import InfoComponent from './components/info-component';
import InfoCostComponent from './components/info-cost-component';
import FilterComponent from './components/filter-component';
import TripController from './controllers/trip-controller';
import MenuComponent from './components/menu-component';

import {generateEvents} from './mock/event-mock';
import {generatePrice, generateTown} from './utils/info';
import {generateDates} from './utils/time';
import {generateInfoTown} from './mock/info-mock';

import {render, RenderPosition} from './utils/render';

const EVENTS_COUNT = 15;


const points = generateInfoTown();
const events = generateEvents(EVENTS_COUNT, points);
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
const trip = new TripController(tripEventsElement);
trip.render(events, points);
