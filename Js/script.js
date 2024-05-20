// main.js
var map = L.map('map').setView([3.42158, -76.5205], 13); // Cambia a la ubicación inicial deseada

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Obtener la ubicación del bus y del usuario
navigator.geolocation.watchPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLon = position.coords.longitude;

    // Marca para el usuario
    var userMarker = L.marker([userLat, userLon]).addTo(map)
        .bindPopup('Usted está aquí').openPopup();

    // Función para actualizar la ubicación del bus
    function updateBusLocation() {
        fetch('get_bus_location.php')
            .then(response => response.json())
            .then(data => {
                var busLat = data.latitude;
                var busLon = data.longitude;

                // Actualizar o crear la marca del bus
                if (typeof busMarker === 'undefined') {
                    busMarker = L.marker([busLat, busLon]).addTo(map)
                        .bindPopup('Bus está aquí').openPopup();
                } else {
                    busMarker.setLatLng([busLat, busLon]);
                }
            });
    }

    // Llamar a la función cada 5 segundos
    setInterval(updateBusLocation, 5000);
});
