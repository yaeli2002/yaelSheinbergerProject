// const cityName = document.getElementById("cityEntered").value;
const degrees = document.getElementById('degrees');
let degreeResult;
function processIput() {
    const cityInput = document.getElementById('city').value;
    runScript(cityInput);
}
function runScript(cityName) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=6bb72e982431e7e730f241f3c727b96d`;


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            return response.json();
        })
        .then(details => {
            if (details.length > 0) {
                /*Geographical coordinates of the found location (latitude)*/
                const lat = details[0]["lat"];
                /*Geographical coordinates of the found location (longitude)*/
                const lon = details[0]["lon"];
                return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=87e44243346361fa613d549675e9c3be`);
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(second => {
            console.log(second);
            degreeResult = Math.round(second.current.temp - 273.15);
            degrees.innerHTML = `${degreeResult}&#xb0;`;
        })
        .catch(error => {
            if (error.message === 'Response was not ok') {
                alert('There was a problem with the response from the server.');
            } else if (error.message === 'Weather data not available') {
                alert('Weather data for the city is not available.');
            } else {
                alert('An unexpected error occurred.');
            }
            console.error('Fetch error:', error);
        });

    /*if (degreeResult > 13) {
        degrees.classList.add = "p-3 mb-2 bg-warning text-dark";
    }
    else {
        degrees.classList.add = `bg - info`;
    }*/

};