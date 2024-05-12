const apiKey = '278b26b6da008b1688a92bc29455509a';

    async function fetchWeatherForecast(city) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      return data;
    }

    async function renderWeatherForecast(city) {
      const forecastData = await fetchWeatherForecast(city);

      const container = document.getElementById('forecast-container');
      container.innerHTML = '';

      const dailyForecasts = forecastData.list.filter((forecast, index) => index % 8 === 0);

      dailyForecasts.forEach(dayForecast => {
        const date = new Date(dayForecast.dt * 1000); 
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const highTemp = dayForecast.main.temp_max;
        const lowTemp = dayForecast.main.temp_min;
        const weatherIcon = dayForecast.weather[0].icon;

        const card = document.createElement('div');
        card.classList.add('day-card');
        card.innerHTML = `
          <h2>${day}</h2>
          <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
          <p>High: ${highTemp}&deg;C</p>
          <p>Low: ${lowTemp}&deg;C</p>
        `;
        container.appendChild(card);
      });
    }

    const form = document.getElementById('search-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const cityInput = document.getElementById('city-input');
      const city = cityInput.value.trim();
      if (city) {
        renderWeatherForecast(city);
        cityInput.value = ''; // Clear input field after submitting
      }
    });

    // Display weather forecast for a default city when the page loads
    renderWeatherForecast('New York');