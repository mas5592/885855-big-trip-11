export const generateTown = (events) => {
  return events.length <= 3 ? events
    .map(({destination}) => {
      return destination.name;
    })
    .join(` — `)

    : `${events[0].destination.name} — ... — ${events[events.length - 1].destination.name}`;
};

