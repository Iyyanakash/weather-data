function getWeather() {
    const city = document.getElementById('city').value;
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');
    const weatherData = document.getElementById('weather-data');

    errorMessage.textContent = '';  // Clear previous error message
    weatherInfo.style.display = 'none';  // Hide weather info if fetching data

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';  // Display error if city is empty
        return;
    }

    fetch(`http://127.0.0.1:5000/get_weather?city=${city}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;  // Show error under the button
            } else {
                // Display weather info if successful
                const emoji = getWeatherEmoji(data.description);
                weatherInfo.style.display = 'block';
                weatherData.innerHTML = `
                    City: ${data.city}<br>
                    Temperature: ${data.temperature}°C<br>
                    Description: ${data.description} ${emoji}<br>
                    Humidity: ${data.humidity}%<br>
                    Wind Speed: ${data.wind_speed} m/s
                `;
            }
        })
        .catch(error => {
            errorMessage.textContent = 'Error fetching weather data.';  // Show generic error
            console.error(error);
        });
}

function getWeatherEmoji(description) {
    let emoji = '';
    const desc = description.toLowerCase();

    if (desc.includes('clear')) {
        emoji = '☀️'; // Sunny
    } else if (desc.includes('cloud')) {
        emoji = '☁️'; // Cloudy
    } else if (desc.includes('rain')) {
        emoji = '🌧️'; // Rainy
    } else if (desc.includes('haze')) {
        emoji = '🌫️'; // Hazy
    } else if (desc.includes('snow')) {
        emoji = '❄️'; // Snowy
    } else if (desc.includes('storm')) {
        emoji = '⛈️'; // Stormy
    } else {
        emoji = '🌡️'; // Default weather
    }
    return emoji;
}
