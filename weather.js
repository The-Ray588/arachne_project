// Модуль: Погода (работает без локального сервера)
window.Clock = window.Clock || {};

function initWeather() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    // Установка местоположения (можете поменять на свой город)
    const latitude = 55.7558;  // Москва
    const longitude = 37.6173; // Москва
    
    const weatherEl = document.createElement('div');
    weatherEl.style.cssText = "font-size:14px; letter-spacing:3px; color:#f6e6c1; margin-top:5px; opacity:0.7;";
    footer.appendChild(weatherEl);
    
    function updateWeather() {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&timezone=auto`;
            
            // Используем XMLHttpRequest вместо fetch, чтобы работать без сервера
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (data && data.current) {
                        weatherEl.textContent = `WEATHER: ${data.current.temperature_2m}°C · WIND: ${data.current.wind_speed_10m} km/h`;
                    }
                } else {
                    weatherEl.textContent = 'WEATHER: NOT AVAILABLE';
                }
            };
            request.onerror = function() {
                weatherEl.textContent = 'WEATHER: NOT AVAILABLE';
            };
            request.send();
        } catch (error) {
            weatherEl.textContent = 'WEATHER: NOT AVAILABLE';
        }
    }
    
    updateWeather();
    setInterval(updateWeather, 600000); // Обновляем каждые 10 Minuten
}

initWeather();
