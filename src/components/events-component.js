import {TYPE_POINTS_TRANSPORT} from '../data';
import {formatTime} from '../utils/time';
import AbstractSmartComponent from './abstact-smart-component';
import {getRandomOffers} from '../mock/offers-mock';

const createEventList = (active) => {
  return TYPE_POINTS_TRANSPORT.map((item) => {
    return `<div class="event__type-item">
        <input
          id="event-type-${item.toLocaleLowerCase()}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item.toLocaleLowerCase()}"
          ${item === active ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${item.toLocaleLowerCase()}" for="event-type-${item.toLocaleLowerCase()}-1">${item}</label>
      </div>`;
  }).join(`\n`);
};

const createOffersList = (offers) => {
  return offers.map((offer) => {
    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" checked>
        <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join(``);
};

const createDestinationDescriptions = (descriptions) => {
  return descriptions.map((description) => `<p class="event__destination-description">${description}</p>`).join(`\n`);
};

const createDestinationPhoto = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(`\n`);
};

export default class Events extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    const {
      destinationDescription,
      destinationPhoto,
      endDate,
      location,
      offers,
      price,
      startDate,
      type,
    } = this._event;


    const timeStart = formatTime(startDate, true);
    const timeEnd = formatTime(endDate, true);

    const offersList = createOffersList(offers);

    const eventList = createEventList(type);
    const descriptionDestination = createDestinationDescriptions(destinationDescription);
    const photoDestination = createDestinationPhoto(destinationPhoto);

    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLocaleLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${eventList}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type ? type : `Bus`} to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${location}" list="destination-list-1">
        <datalist id="destination-list-1">
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart ? timeStart : `18/03/19 00:00`}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd ? timeEnd : `18/03/19 00:00`}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ``}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offers.length > 0 ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersList}
        </div>
      </section>` : ``}
      ${destinationDescription.length > 0 || destinationPhoto > 0 ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${descriptionDestination}
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photoDestination}
          </div>
        </div>
      </section>` : ``}
    </section>
  </form>`.trim();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._FavoriteHandler);

    this.setClickHandler(this._clickHandler);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
    this._FavoriteHandler = handler;
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._clickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        this._type = evt.target.value;
        this.rerender();
      });
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      if (this._points.find((it) => it.location === evt.target.value)) {
        this._location = evt.target.value;
        this._offers = getRandomOffers();

        this.rerender();
      }
    });
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._event = this._event;
    this._type = this._event.type;
    this._location = this._event.info.location;
    this.rerender();
  }
}
