window.addEventListener('load', () => {
    if (!navigator.onLine) {
        document.getElementById('display-offline').classList.add('show');
        document.getElementById('display-offline').classList.remove('hide');
    }
});

document.getElementById('weather').addEventListener('click', getWeather);

async function getWeather(e) {
    e.preventDefault();
    let city = document.getElementById('city').value;
    let cname = document.getElementById('name').value;
    if (city === null || city === "") {
        document.getElementById('display-alert').classList.add('show');
        document.getElementById('display-alert').classList.remove('hide');
        setTimeout(() => {
            document.getElementById('display-alert').classList.add('hide');
            document.getElementById('display-alert').classList.remove('show');
        }, 3500)
        return;
    }
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${cname}&appid=66d94004ad16b76de1f87a62e94246e5&units=metric`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // display a message if city not found
            if (data.message !== undefined) {
                let output = '<h2>Weather</h2>';
                output += `<p>${data.message}</p>`
                document.getElementById('output').innerHTML = output;
                return;
            }
            // store search in localstorage
            let weatherData = JSON.stringify(data);
            if (localStorage.getItem('myData') === null) {
                localStorage.setItem('myData', weatherData);
            } else if (localStorage.getItem('myData') != null) {
                weatherData = JSON.stringify(data);
                localStorage.setItem('myData', weatherData);
            }
            // get data in localstorage and use it
            const newData = JSON.parse(localStorage.getItem('myData'));
            const datetime = newData.dt;
            const tday = new Date(datetime * 1000).toUTCString();
            const sunRise = new Date(newData.sys.sunrise * 1000).getHours();
            const sunSet = new Date(newData.sys.sunset * 1000).getHours();
            let output = '<h2>Weather</h2>';
            output += `<img src="https://openweathermap.org/img/w/${newData.weather[0].icon}.png" alt="${newData.weather[0].description}" loading="lazy" id="weather-img"/>
            <p>Temp: ${newData.main.temp} celcius</p>
            <p>Wind Speed: ${newData.wind.speed} m/s</p>
            <p>Day: ${tday}</p>
            <p>Weather Description: ${newData.weather[0].description}</p> 
            <p>Sunrise: ${sunRise <= 11 ? `<span>${sunRise}am</span>` : `<span>${sunRise}pm</span>`}</span> <span>Sunset: ${sunSet <= 11 ? `<span>${sunSet}am</span>` : `<span>${sunSet}pm</span>`}</p>
            <p>State, Country: ${newData.name}, ${newData.sys.country}</span>`
            document.getElementById('output').innerHTML = output;
        })
        .catch(err => console.log(err));
    setTimeout(() => {
        document.getElementById("city").value = "";
        document.getElementById("name").value = "";
    }, 3000)
}

if (localStorage.getItem('myData') !== null) {
    const newData = JSON.parse(localStorage.getItem('myData'));
    const datetime = newData.dt;
    const tday = new Date(datetime * 1000).toUTCString();
    const sunRise = new Date(newData.sys.sunrise * 1000).getHours();
    const sunSet = new Date(newData.sys.sunset * 1000).getHours();
    let output = '<h2>Weather</h2>';
    output += `<img src="https://openweathermap.org/img/w/${newData.weather[0].icon}.png" alt="${newData.weather[0].description}" loading="lazy" id="weather-img"/>
                <p>Temp: ${newData.main.temp} celcius</p>
                <p>Wind Speed: ${newData.wind.speed} m/s</p>
                <p>Day: ${tday}</p>
                <p>Weather Description: ${newData.weather[0].description}</p> 
                <p>Sunrise: ${sunRise <= 11 ? `<span>${sunRise}am</span>` : `<span>${sunRise}pm</span>`}</span> <span>Sunset: ${sunSet <= 11 ? `<span>${sunSet}am</span>` : `<span>${sunSet}pm</span>`}</p>
                <p>State, Country: ${newData.name}, ${newData.sys.country}</span>`
    document.getElementById('output').innerHTML = output;
}