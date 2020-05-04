import {formatTime, formatDurationTime} from '../utils/time';
import {TYPE_POINTS_ACTIVITY} from '../data';
import AbstractComponent from './abstract-component';

export const getOffers = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  }).join(``);
};

export default class EventsItem extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    const {type, offers, startDate, endDate, price, info} = this._event;
    const timeEnd = formatTime(endDate);
    const timeStart = formatTime(startDate);
    const timeDuration = endDate - startDate;
    const action = TYPE_POINTS_ACTIVITY.some((it) => type === it) ? `in` : `to`;

    const location = info.location;
    const offersList = getOffers(offers);


    return `<li class="trip-events__item">
           <div class="event">
             <div class="event__type">
               <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
             </div>
             <h3 class="event__title">${type} ${action} ${location}</h3>

             <div class="event__schedule">
               <p class="event__time">
                 <time class="event__start-time" datetime="2019-03-18T11:00">${timeStart}</time>
                 &mdash;
                 <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
               </p>
               <p class="event__duration">${formatDurationTime(timeDuration)}</p>
             </div>

             <p class="event__price">
               &euro;&nbsp;<span class="event__price-value">${price}</span>
             </p>

             <h4 class="visually-hidden">Offers:</h4>
             <ul class="event__selected-offers">
             ${offersList}
             </ul>

             <button class="event__rollup-btn" type="button">
               <span class="visually-hidden">Open event</span>
             </button>
           </div>
      </li>`.trim();
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}


