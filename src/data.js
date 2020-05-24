export const AUTHORIZATION = `Basic sbsrgr344tytetgsbrw4`;

export const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

export const HIDDEN_CLASS = `visually-hidden`;

export const Timeout = {
  SERVER: 15000,
  DEBOUNCE: 500,
  SHAKE_ANIMATION: 600
};

export const ESC_KEYCODE = 27;

export const TRAVEL_TRANSPORT = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

export const TRAVEL_ACTIVITY = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];


export const Placeholder = {
  TRANSPORT: `to`,
  ACTION: `in`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const Method = {
  DELETE: `DELETE`,
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`
};

export const DefaultBtnText = {
  DELETE: `Delete`,
  SAVE: `Save`
};

export const ConnectBtnText = {
  DELETE: `Deleting...`,
  SAVE: `Saving...`
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const MenuItem = {
  STATS: `stats`,
  TABLE: `table`
};

export const StoreInfo = {
  STORE_PREFIX: `big-trip-localstorage`,
  STORE_VER: `v1`,

  getStoreName(key) {
    return `${this.STORE_PREFIX}-${this.STORE_VER}-${key}`;
  }
};

export const StoreKey = {
  POINTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`
};

export const StatisticsGraph = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  TIME_SPENT: `time spent`
};
