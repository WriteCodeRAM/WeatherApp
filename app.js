//API KEY 1aaa2a04f293007cd4b900bb71f829b4
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=1aaa2a04f293007cd4b900bb71f829b4
const searchBar = document.querySelector('.search-city');
const weatherReport = document.querySelector('.weather-report');
const weatherGIF = document.querySelector('.weather-GIF');

const getWeather = async function () {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Miami&APPID=1aaa2a04f293007cd4b900bb71f829b4',
    { mode: 'cors' }
  );
  const resData = await res.json();
  console.log(resData);
};

getWeather();

//kelvin to celcius
const KtoC = function (K) {
  return K - 273.15;
};

//Kelvin to farenheight
const KtoF = function (K) {
  return ((K - 273.15) * 9) / 5 + 32;
};

const displayWeather = () => {
  // p for description
  // h1 for city name
  // h1 for weather
};
