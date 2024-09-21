document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "YOUR_API_KEY";
  let latitude = 48.8566;
  let longitude = 2.3522;

  const fetchWeather = (lat, lon, city = "Ville") => {
    const url = `https://my.meteoblue.com/packages/basic-day?lat=${lat}&lon=${lon}&apikey=${apiKey}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data && data.data_day) {
          const temperature = data.data_day.temperature_instant[0];
          const temperatureMax = data.data_day.temperature_max[0];
          const temperatureMin = data.data_day.temperature_min[0];

          // Mettre à jour l'interface utilisateur
          document.getElementById("city-name").textContent = city;
          document.getElementById("temperature").textContent = `Température actuelle: ${temperature}°C`;
          document.getElementById("description").textContent = `Max: ${temperatureMax}°C | Min: ${temperatureMin}°C`;
        } else {
          console.log("Les données retournées ne contiennent pas les champs attendus");
        }
      })
      .catch((error) => console.log("Erreur:", error));
  };

  document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
      fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            latitude = data[0].lat;
            longitude = data[0].lon;

            fetchWeather(latitude, longitude, city);
          } else {
            alert("Ville non trouvée");
          }
        })
        .catch((error) => console.log("Erreur:", error));
    } else {
      alert("Veuillez entrer un nom de ville");
    }
  });

  fetchWeather(latitude, longitude, "Paris");
});
