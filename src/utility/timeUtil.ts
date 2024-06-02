import { addDays } from "date-fns";

type time = {
  today: Date,
  date: number,
  dateString: string,
  day: number,
  month: number,
  year: number,
  tomorrow: Date,
  tomorrowDate: number,
  tomorrowDateString: string
}

export function getTime():time{
  const today: Date = new Date();
  const date: number = today.getDate();
  const dateString: string = date.toString();
  const day: number = today.getDay();
  const month: number = today.getMonth();
  const year: number = today.getFullYear();
  const tomorrowDate: number = new Date().getDate()+1;
  const tomorrow = addDays(today, 1);
  const tomorrowDateString: string = tomorrowDate.toString();

  return {today, date, dateString, day, month, year, tomorrow, tomorrowDate, tomorrowDateString}
}
