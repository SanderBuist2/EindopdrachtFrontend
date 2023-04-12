export const FormatEvent = (Event) => {
  Event.createdBy = Number(Event.createdBy);
  const keys = Object.keys(Event);
  const categories = keys.filter((key) => {
    if (key.slice(0, 11) === "categoryIds") return key;
  });

  Event.categoryIds = [];
  categories.forEach((cat) => {
    Event.categoryIds.push(Number(Event[cat]));
    delete Event[cat];
  });

  keys.forEach((key) => {
    if (!Event[key]) delete Event[key];
  });
};
