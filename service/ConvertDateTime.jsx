import moment from "moment";
export const formatDate = (timestamp) => {
  return new Date(timestamp);
};
export const formatDateForText = (date) => {
  return moment(date).format("ll");
};
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};

export const getDatesRange = (startdate, enddate) => {
  const start = moment(startdate, "MM/DD/YYYY");
  const end = moment(enddate, "MM/DD/YYYY");
  const dates = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1, "days");
  }
  return dates;
};
