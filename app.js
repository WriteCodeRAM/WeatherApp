//API KEY 1aaa2a04f293007cd4b900bb71f829b4
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=1aaa2a04f293007cd4b900bb71f829b4
const searchBar = document.querySelector('.search-city');
const weatherReport = document.querySelector('.weather-report');
const weatherGIF = document.querySelector('.weather-GIF');
const mainInfo = document.querySelector('.main-info');
const extraInfo = document.querySelector('.extra-info');
const slider = document.querySelector('.slider');

console.log(slider);
const getWeather = async function () {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&APPID=1aaa2a04f293007cd4b900bb71f829b4`,
      { mode: 'cors' }
    );
    const resData = await res.json();
    console.log(resData);
    displayWeather(resData);
  } catch (err) {
    console.log(`couldnt find that city, ${err}`);
    mainInfo.innerText = `City not found`;
  }
};

searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    clearWeather();
    getWeather();
    searchBar.value = '';
  }
});

//kelvin to celcius
const KtoC = function (K) {
  return Math.round(K - 273.15) + '°C';
};

//Kelvin to farenheight
const KtoF = function (K) {
  return Math.round(((K - 273.15) * 9) / 5 + 32) + '°F';
};

const displayWeather = (obj) => {
  // p for description
  // h1 for city name
  // h1 for weather
  const description = document.createElement('p');
  const city = document.createElement('h1');
  const weather = document.createElement('h1');
  const slider = document.createElement('input');

  slider.type = 'checkbox';
  slider.classList.add('slider');
  description.innerText = obj.weather[0].description;
  city.innerText = obj.name;
  weather.innerText = KtoF(obj.main.temp);

  city.classList.add('city');
  description.style.fontStyle = 'italic';

  mainInfo.appendChild(description);
  mainInfo.appendChild(city);
  mainInfo.appendChild(weather);
  mainInfo.appendChild(slider);

  // p for feels like
  // p for today's high
  // p for humidity
  const feelsLike = document.createElement('p');
  const todaysHigh = document.createElement('p');
  const humidity = document.createElement('p');

  feelsLike.innerText = `Feels like: ${KtoF(obj.main.feels_like)}`;
  todaysHigh.innerText = `Today's high: ${KtoF(obj.main.temp_max)}`;
  humidity.innerText = `Humidity: ${obj.main.humidity}%`;

  extraInfo.classList.add('active');

  extraInfo.appendChild(feelsLike);
  extraInfo.appendChild(todaysHigh);
  extraInfo.appendChild(humidity);

  function toggleSlider() {
    if (!slider.checked) {
      feelsLike.innerText = `Feels like: ${KtoF(obj.main.feels_like)}`;
      todaysHigh.innerText = `Today's high: ${KtoF(obj.main.temp_max)}`;
      weather.innerText = KtoF(obj.main.temp);
    } else {
      feelsLike.innerText = `Feels like: ${KtoC(obj.main.feels_like)}`;
      todaysHigh.innerText = `Today's high: ${KtoC(obj.main.temp_max)}`;
      weather.innerText = KtoC(obj.main.temp);
    }
  }

  slider.addEventListener('click', toggleSlider);
};

const clearWeather = function () {
  mainInfo.innerText = ``;
  extraInfo.innerText = ``;
};
