// Inicializar el mapa con una vista centrada por defecto
var map = L.map('map', {
    minZoom: 2,  // Zoom mínimo para evitar que el mapa se repita
    maxBounds: [[-90, -180], [90, 180]],  // Límites del mapa para evitar repeticiones
    zoomControl: false  // Desactivar el control de zoom predeterminado
}).setView([0, 0], 2); // Coordenadas iniciales genéricas

// Añadir la capa del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir controles de zoom personalizados en la parte inferior derecha
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Intentar obtener la ubicación actual del usuario y centrar el mapa
getLocation();

// Función para calcular la ruta (ejemplo simple)
function calculateRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    alert('Calculando ruta desde ' + start + ' hasta ' + end);
}

// Función para obtener la ubicación actual del usuario
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalización no es soportada por este navegador.");
    }
}

// Mostrar la posición actual del usuario en el mapa
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Define custom icon for user's location
    var userIcon = L.divIcon({
        className: 'user-location-icon',
        html: '<div class="outer-circle"><div class="inner-circle"></div></div>'
    });

    // Add marker for user's location
    var userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(map);
    userMarker
    .openPopup();

    map.setView([lat, lon], 13);
}

// Manejar errores de geolocalización
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario denegó la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud de geolocalización expiró.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocurrió un error desconocido.");
            break;
    }
}
