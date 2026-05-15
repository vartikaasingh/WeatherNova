const apiKey = "21905ac5d239680c627c1028b3bf7f7d";

function formatHour(hour){

const ampm = hour >= 12 ? "PM" : "AM";

const formattedHour = hour % 12 || 12;

return `${formattedHour} ${ampm}`;

}

function changeBackground(weather){

if(weather == "Clouds"){

document.body.style.background =
"linear-gradient(to right,#757f9a,#d7dde8)";

}

else if(weather == "Rain"){

document.body.style.background =
"linear-gradient(to right,#4b79a1,#283e51)";

}

else if(weather == "Clear"){

document.body.style.background =
"linear-gradient(to right,#f7971e,#ffd200)";

}

else{

document.body.style.background =
"linear-gradient(to right,#4facfe,#00f2fe)";

}

}

function changeWeatherIcon(weather){

if(weather == "Clouds"){

document.getElementById("weatherIcon").src =
"https://cdn-icons-png.flaticon.com/512/414/414825.png";

}

else if(weather == "Rain"){

document.getElementById("weatherIcon").src =
"https://cdn-icons-png.flaticon.com/512/3351/3351979.png";

}

else if(weather == "Clear"){

document.getElementById("weatherIcon").src =
"https://cdn-icons-png.flaticon.com/512/869/869869.png";

}

else{

document.getElementById("weatherIcon").src =
"https://cdn-icons-png.flaticon.com/512/1779/1779940.png";

}

}

function updateHourlyForecast(temp){

const currentHour = new Date().getHours();

document.getElementById("hourlyBox").innerHTML = `

<div class="hour-card">
<p>${formatHour(currentHour)}</p>
<h4>${Math.round(temp)}°C</h4>
</div>

<div class="hour-card">
<p>${formatHour(currentHour + 1)}</p>
<h4>${Math.round(temp - 1)}°C</h4>
</div>

<div class="hour-card">
<p>${formatHour(currentHour + 2)}</p>
<h4>${Math.round(temp - 2)}°C</h4>
</div>

<div class="hour-card">
<p>${formatHour(currentHour + 3)}</p>
<h4>${Math.round(temp - 1)}°C</h4>
</div>

`;

}

function updateWeatherUI(data){

document.getElementById("temp").innerHTML =
Math.round(data.main.temp) + "°C";

document.getElementById("cityName").innerHTML =
data.name;

document.getElementById("condition").innerHTML =
data.weather[0].main;

document.getElementById("humidity").innerHTML =
data.main.humidity + "%";

document.getElementById("wind").innerHTML =
data.wind.speed + " km/h";

const sunriseTime = new Date(
data.sys.sunrise * 1000
).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

const sunsetTime = new Date(
data.sys.sunset * 1000
).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

document.getElementById("sunrise").innerHTML =
sunriseTime;

document.getElementById("sunset").innerHTML =
sunsetTime;

changeBackground(data.weather[0].main);

changeWeatherIcon(data.weather[0].main);

updateHourlyForecast(data.main.temp);

}

async function getWeather() {

const cityInput = document.getElementById("city").value;

try {

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
);

const data = await response.json();

updateWeatherUI(data);

}

catch(error){

alert("City not found");

}

}

window.onload = () => {

navigator.geolocation.getCurrentPosition(

async(position) => {

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
);

const data = await response.json();

updateWeatherUI(data);

}

);

};

const darkModeBtn =
document.getElementById("darkModeToggle");

darkModeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

});

document.getElementById("city")
.addEventListener("keypress",function(event){

if(event.key === "Enter"){

getWeather();

}

});