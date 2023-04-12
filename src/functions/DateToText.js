import PropTypes from "prop-types";

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const months = [
  "januari",
  "februari",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const dateToText = (date) => {
  return (
    weekdays[date.getDay()] +
    " " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear()
  );
};

export const timeToText = (date) => {
  return date.toTimeString().slice(0, 5);
};

export const dateAndTimeToText = (date) => {
  return dateToText(date) + " " + timeToText(date);
};

dateToText.proptypes = {
  date: PropTypes.instanceOf(Date),
};

timeToText.proptypes = {
  date: PropTypes.instanceOf(Date),
};

dateAndTimeToText.proptypes = {
  date: PropTypes.instanceOf(Date),
};
