import axios from "axios";
import { Request, Response } from "express";
import {format} from "date-fns"
import {toZonedTime} from "date-fns-tz";
import { getTime } from "../utility/timeUtil";

const WEATHER_API = "https://ibnux.github.io/BMKG-importer/cuaca/501545.json";

interface WeatherData {
  jamCuaca: string,
  kodeCuaca: number | string,
  cuaca: string,
  humidity: number | string,
  tempC: number | string,
  tempF: number | string,
};

async function getTomorrow() {
  try{
    const response = await axios.get(WEATHER_API);
    const weather: WeatherData[] = response.data;
    const {today, tomorrow} = getTime();
    const tomorrowString = format(tomorrow, "yyyy-MM-dd");


    const tomorrowWeather = weather.filter((item) => item.jamCuaca.substring(0,10) === tomorrowString);

    return  tomorrowWeather
  }catch(err){
    throw err;
  }
}

async function getToday() {
  try{
    const response = await axios.get(WEATHER_API);
    const weather: WeatherData[] = response.data;
    const {today, tomorrow} = getTime();
    const todayString = format(today, "yyyy-MM-dd");


    const todayWeather = weather.filter((item) => item.jamCuaca.substring(0,10) === todayString);

    return  todayWeather
  }catch(err){
    throw err;
  }
}

function getWeatherEmoji(kodeCuaca: number | string) {
  switch (kodeCuaca) {
    case "0":
      return "☀️";
    case "1":
      return "⛅";
    case "2":
      return "⛅";
    case "3":
      return "☁️";
    case "4":
      return "🌧️";
    case "5":
      return "🌫";
    case "10":
      return "🌫";
    case "45":
      return "🌫";
    case "60":
      return "🌧️";
    case "61":
      return "🌧️";
    case "63":
      return "🌧️";
    case "80":
      return "🌧️";
    case "95":
      return "🌩";
    case "97":
      return "🌩";
  
  }
}

export {getTomorrow, getWeatherEmoji, getToday}