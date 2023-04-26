export const convertDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // adding 1 because getMonth() returns 0-based month index
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}/${month}/${year} | ${hours}:${minutes}`;
  return formattedDate;
};
