import moment from "moment";
export const formatDate = (timestamp) => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};
export const formatDateForText = (date) => {
  return moment(date).format("ll");
};
