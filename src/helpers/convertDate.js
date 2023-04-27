export const convertDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${month} ${year} | ${`${hours}`.padStart(
    2,
    "0"
  )}:${`${minutes}`.padStart(2, "0")}`;
  return formattedDate;
};
