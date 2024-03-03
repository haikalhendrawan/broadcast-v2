type time = [
  today: Date,
  date: number,
  dateString: string,
  day: number,
  month: number,
  year: number,
  tomorrowDate: number,
  tomorrowDateString: string
]

export function getTime():time{
  const today: Date = new Date();
  const date: number = today.getDate();
  const dateString: string = date.toString();
  const day: number = today.getDay();
  const month: number = today.getMonth();
  const year: number = 0;
  const tomorrowDate: number = new Date().getDate()+1;
  const tomorrowDateString: string = tomorrowDate.toString();

  return [today, date, dateString, day, month, year, tomorrowDate, tomorrowDateString]
}
