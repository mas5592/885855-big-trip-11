export const AUTHORIZATION = `Basic sbsrgr344tytetgsbrw4`;

export const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

export const HIDDEN_CLASS = `visually-hidden`;

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const SERVER_TIMEOUT = 10000;

export const ESC_KEYCODE = 27;

export const TypeRoutePoint = {
  TRANSFER: [
    `Bus`,
    `Drive`,
    `Flight`,
    `Ship`,
    `Taxi`,
    `Train`,
    `Transport`
  ],
  ACTIVITY: [
    `Check-in`,
    `Restaurant`,
    `Sightseeing`
  ]
};

export const FilterType = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

export const Method = {
  DELETE: `DELETE`,
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`
};

export const ButtonsTextDefault = {
  DELETE: `Delete`,
  SAVE: `Save`
};

export const ConnectingButtonsText = {
  DELETE: `Deleting...`,
  SAVE: `Saving...`
};

export const TYPE_POINTS_TRANSPORT = [
  `Bus`,
  `Drive`,
  `Flight`,
  `Ship`,
  `Taxi`,
  `Train`,
  `Transport`,
];

export const SORT_TYPE = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const MenuItem = {
  STATS: `stats`,
  TABLE: `table`
};

export const Mode = {
  ADD: `add`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const StoreInfo = {
  STORE_PREFIX: `big-trip-localstorage`,
  STORE_VER: `v1`,

  getStoreName(key) {
    return `${this.STORE_PREFIX}-${this.STORE_VER}-${key}`;
  }
};

export const StoreKey = {
  DESTINATIONS: `destinations`,
  POINTS: `points`,
  OFFERS: `offers`,
};
