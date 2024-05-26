// Inicializar el mapa con una vista centrada por defecto
var map = L.map("map", {
  minZoom: 2,
  maxBounds: [
    [-90, -180],
    [90, 180],
  ],
  zoomControl: false,
}).setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var userMarker;
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocalización no es soportada por este navegador.");
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var userIcon = L.divIcon({
    className: "user-location-icon",
    html: '<div class="outer-circle"><div class="inner-circle"></div></div>',
  });

  if (userMarker) {
    map.removeLayer(userMarker);
  }

  userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(map);
  userMarker.openPopup();
  map.setView([lat, lon], 13);
}

function showError(error) {
  switch (error.code) {
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

// Login
const modal = document.querySelector(".modal");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const closeIcon = document.querySelector(".close-icon");

registerLink.addEventListener("click", () => {
  modal.classList.add("activate");
});

loginLink.addEventListener("click", () => {
  modal.classList.remove("activate");
});

btnPopup.addEventListener("click", () => {
  modal.classList.add("activate-popup");
});

closeIcon.addEventListener("click", () => {
  modal.classList.remove("activate-popup");
});

/* Obtencion de informacion del formulario de inicio de sesion y registro + conexion a la base de datos */ 
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);

    fetch("php/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text().then((text) => {
          console.log("Response text:", text);
          try {
            return JSON.parse(text);
          } catch (error) {
            throw new Error("Invalid JSON: " + text);
          }
        });
      })
      .then((data) => {
        if (data.success) {
          window.location.href = "php/pagina_conductor.php";
        } else {
          alert("Inicio de sesión fallido: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("username", document.getElementById("username").value);
    formData.append("email", document.getElementById("registerEmail").value);
    formData.append(
      "password",
      document.getElementById("registerPassword").value
    );

    fetch("php/register.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registro exitoso");
        } else {
          alert("Error en el registro: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Lista de puntos de referencia con sus coordenadas
var routes = {
  1: [
    { name: "DESPACHO LA MARIA", coords: [3.308608, -76.539735] },
    { name: "CAÑAS GORDAS", coords: [3.324761, -76.53401] },
    { name: "ICESI", coords: [3.341837, -76.530986] },
    { name: "JAVERIANA", coords: [3.348674, -76.530412] },
    { name: "CIUDAD JARDIN", coords: [3.360371, -76.530677] },
    { name: "CIUDAD JARDIN", coords: [3.365331, -76.530961] },
    { name: "JARDIN PLAZA", coords: [3.368843, -76.529505] },
    { name: "ENTRADA MOTOS UNIVALLE", coords: [3.370258, -76.534817] },
    { name: "UNIVALLE", coords: [3.375138, -76.537198] },
    { name: "CALLE 13 CON KR 80", coords: [3.38667, -76.53849] },
    { name: "CALLE 13 CON KR 68 Y 66", coords: [3.397186, -76.537868] },
    { name: "CRA 56", coords: [3.404232, -76.532812] },
    { name: "CALLE 14 ENTRE 53 Y 50", coords: [3.406804, -76.530407] },
    { name: "CALLE 14 ENTRE 43 Y 42", coords: [3.415157, -76.528102] },
    { name: "CALLE 14 ENTRE 34 Y 33A", coords: [3.422966, -76.527446] },
    { name: "CALLE 13 CON CL 14", coords: [3.429512, -76.527287] },
    { name: "CALLE 13", coords: [3.432875, -76.527889] },
    { name: "CALLE 13", coords: [3.440018, -76.528438] },
    { name: "CRA.15", coords: [3.442749, -76.529578] },
    { name: "CALLE 11", coords: [3.444646, -76.530774] },
    { name: "CRA 10", coords: [3.447563, -76.53036] },
    { name: "CRA 10 CON CL 21", coords: [3.449236, -76.522661] },
    { name: "CALLE 10A", coords: [3.448931, -76.522583] },
    { name: "CALLE 20 #10A", coords: [3.448731, -76.523256] },
    { name: "CALLE 20 ", coords: [3.450593, -76.523851] },
    { name: "CRA 8", coords: [3.451278, -76.524713] },
    { name: "CALLE 18", coords: [3.45199, -76.52622] },
    { name: "CALLE 18", coords: [3.453409, -76.526826] },
    { name: "CRA 5", coords: [3.454568, -76.525712] },
    { name: "CRA 5", coords: [3.456781, -76.520733] },
    { name: "CRA 5", coords: [3.458531, -76.514322] },
    { name: "CRA 5 ENTRE CL 37 Y 38", coords: [3.459719, -76.510576] },
    { name: "CRA 5 ENTRE CL 44 Y 44B", coords: [3.460891, -76.506806] },
    { name: "CALLE 45", coords: [3.46249, -76.505766] },
    { name: "CALLE 45 CON KR 2B", coords: [3.465166, -76.506937] },
    { name: "CRA 2DA", coords: [3.467101, -76.505106] },
    { name: "CRA 2DA CON CL 52 Y 56", coords: [3.468522, -76.50062] },
  ],
};

function showRoute() {
  var routeId = document.getElementById("routeInput").value;
  if (routes[routeId]) {
    routes[routeId].forEach((point) => {
      L.marker(point.coords).bindPopup(point.name).addTo(map);
    });
  } else {
    alert("Ruta no encontrada.");
  }
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const panel = document.querySelector(".panel");

hamburgerMenu.addEventListener("click", () => {
  panel.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
});
