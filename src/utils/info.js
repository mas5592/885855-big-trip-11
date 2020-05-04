export const generatePrice = (arr) => {
  return arr.reduce((sum, item) => sum + item.price, 0);
};

export const generateTown = (events) => {
  return events.length <= 3 ? events.map((event) => event.info.location).join(` — `) : `${events[0].info.location} — ... — ${events[events.length - 1].info.location}`;
};
