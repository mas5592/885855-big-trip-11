import {TYPE_MONTHS} from './data';

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date, forForm = false) => {
  const year = castTimeFormat(date.getUTCFullYear()) % 2000;
  const month = castTimeFormat(date.getMonth());
  const day = castTimeFormat(date.getDate());
  const hour = castTimeFormat(date.getHours() % 12);
  const minute = castTimeFormat(date.getMinutes());

  return forForm ? `${day}/${month}/${year} ${hour}:${minute}` : `${hour}:${minute}`;
};

export const formatDurationTime = (timeDuration) => {
  const time = Math.floor((timeDuration) / 60000);
  const minutes = time % 60;
  const days = Math.round((time - minutes) / 1440);
  const hours = Math.round((time - minutes) / 60 - days * 24);

  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`;
};

export const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

export const generateTown = (events) => {
  return events.length <= 3 ? events.map((event) => event.location).join(` — `) : `${events[0].location} — ... — ${events[events.length - 1].location}`;
};

export const generateDates = (events) => {
  const set = new Set();
  events.forEach((evt) => set.add(JSON.stringify({day: evt.startDate.getDate(), month: TYPE_MONTHS[evt.startDate.getMonth()]})));
  return Array.from(set).map((evt) => JSON.parse(evt));
};

export const generatePrice = (arr) => {
  return arr.reduce((sum, item) => sum + item.price, 0);
};
