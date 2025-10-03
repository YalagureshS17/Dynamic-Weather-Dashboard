const url ='https://api.openweathermap.org/data/2.5/weather';
const apiKey ='f5c0917cf0c184a1597a8b1e8159fe7e';

$(document).ready(function () {
    // Get city from URL if present
    const params = new URLSearchParams(window.location.search);
    const cityFromUrl = params.get('city');
    if (cityFromUrl) {
        weatherFn(cityFromUrl);
        $('#city-input').val(cityFromUrl);
    } else {
        weatherFn('Delhi'); // Default city
    }
});

async function weatherFn(cName) {
	const temp =`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}
function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    // Set weather icon from OpenWeatherMap
    $('#weather-icon').attr(
        'src',
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    );
    $('#weather-info').fadeIn();
}
$('#city-input-btn').on('click', function () {
    let cityName = $('#city-input').val();
    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }
    // Check for country names
    const countryList = ["india", "usa", "france", "germany", "italy", "china", "japan"];
    if (countryList.includes(cityName.trim().toLowerCase())) {
        alert("Please enter a city name, not a country.");
        return;
    }
    weatherFn(cityName);
});
$('#city-input').on('keypress', function (e) {
    if (e.which === 13) { // 13 is the Enter key
        $('#city-input-btn').click();
    }
}); 