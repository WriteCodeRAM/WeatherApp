//API KEY 1aaa2a04f293007cd4b900bb71f829b4
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=1aaa2a04f293007cd4b900bb71f829b4
const searchBar = document.querySelector('.search-city');
const weatherReport = document.querySelector('.weather-report');
const weatherGIF = document.querySelector('.weather-GIF');
const mainInfo = document.querySelector('.main-info');
const extraInfo = document.querySelector('.extra-info');

const getWeather = async function (x) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        searchBar.value || x
      }&APPID=1aaa2a04f293007cd4b900bb71f829b4`,
      { mode: 'cors' }
    );
    const resData = await res.json();
    clearWeather();
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
  return (K - 273.15).toFixed(1) + '°C';
};

//Kelvin to farenheight
const KtoF = function (K) {
  return (((K - 273.15) * 9) / 5 + 32).toFixed(1) + '°F';
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
  const todaysLow = document.createElement('p');
  const todaysHigh = document.createElement('p');
  const humidity = document.createElement('p');

  feelsLike.innerText = `Feels like: ${KtoF(obj.main.feels_like)}`;
  todaysLow.innerText = `Today's low: ${KtoF(obj.main.temp_min)}`;
  todaysHigh.innerText = `Today's high: ${KtoF(obj.main.temp_max)}`;
  humidity.innerText = `Humidity: ${obj.main.humidity}%`;

  extraInfo.classList.add('active');

  extraInfo.appendChild(feelsLike);
  extraInfo.appendChild(todaysLow);
  extraInfo.appendChild(todaysHigh);
  extraInfo.appendChild(humidity);

  function toggleSlider() {
    if (!slider.checked) {
      feelsLike.innerText = `Feels like: ${KtoF(obj.main.feels_like)}`;
      todaysLow.innerText = `Today's low: ${KtoF(obj.main.temp_min)}`;
      todaysHigh.innerText = `Today's high: ${KtoF(obj.main.temp_max)}`;
      weather.innerText = KtoF(obj.main.temp);
    } else {
      feelsLike.innerText = `Feels like: ${KtoC(obj.main.feels_like)}`;
      todaysLow.innerText = `Today's low: ${KtoC(obj.main.temp_min)}`;
      todaysHigh.innerText = `Today's high: ${KtoC(obj.main.temp_max)}`;
      weather.innerText = KtoC(obj.main.temp);
    }
  }

  slider.addEventListener('click', toggleSlider);

  //get GIF
  // key p8ATwCVsmErawdfI34y7uECfYDnpg3aG

  const getGIF = async function () {
    try {
      const imgHolder = document.querySelector('.gif');
      const GIF = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=p8ATwCVsmErawdfI34y7uECfYDnpg3aG&s=${description.innerText}`,
        { mode: 'cors' }
      );
      const GIF_Data = await GIF.json();

      imgHolder.src = GIF_Data.data.images.original.url;
    } catch (err) {
      console.log(err);
    }
  };
  getGIF();
};

const clearWeather = function () {
  mainInfo.innerText = ``;
  extraInfo.innerText = ``;
};

getWeather('miami');
