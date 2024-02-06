const today = new Date();
const date = today.getDate();
const dateString = date.toString();
const day = today.getDay();
const month = today.getMonth();
const year = 0;
const tomorrowDate = new Date().getDate()+1;
const tomorrowDateString = tomorrowDate.toString();


export {today, date, dateString, tomorrowDate, tomorrowDateString, day, month, year}