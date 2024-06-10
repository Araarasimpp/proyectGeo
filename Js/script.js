var userMarker;
var watchID;

var currentLat = 0; // Variable global para almacenar la latitud
var currentLon = 0; // Variable global para almacenar la longitud
let mapCentered = false; // Variable de control para centrar el mapa solo una vez

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    // Inicia la observación de la posición del usuario
    watchID = navigator.geolocation.watchPosition(showPosition, showError, {
      enableHighAccuracy: true, // Usar la mayor precisión disponible
      maximumAge: 0, // No utilizar posiciones guardadas en caché
    });
  } else {
    alert("Geolocalización no es soportada por este navegador.");
  }
}

function showPosition(position) {
  currentLat = position.coords.latitude; // Almacena la latitud actual
  currentLon = position.coords.longitude; // Almacena la longitud actual

  var userIcon = L.divIcon({
    className: "user-location-icon",
    html: '<div class="outer-circle"><div class="inner-circle"></div></div>',
  });

  if (userMarker) {
    // Actualizar la posición del marcador
    userMarker.setLatLng([currentLat, currentLon]);
  } else {
    // Crear un nuevo marcador en la posición del usuario
    userMarker = L.marker([currentLat, currentLon], { icon: userIcon }).addTo(
      map
    );
  }

  if (!mapCentered) {
    // Centrar el mapa solo la primera vez
    map.setView([currentLat, currentLon], 13);
    mapCentered = true; // Marcar como centrado para evitar centrar de nuevo
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("El usuario denegó la solicitud de geolocalización.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("La información de ubicación no está disponible.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Ocurrió un error desconocido.");
      break;
  }
}

// Función para centrar el mapa en la ubicación actual del usuario
function centerMapOnCurrentLocation() {
  if (currentLat && currentLon) {
    map.setView([currentLat, currentLon], 13);
  } else {
    alert("La ubicación actual no está disponible.");
  }
}

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

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    fetch("https://apiprosig-production.up.railway.app/api/login", {
      method: "POST",
      body: formData,
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          alert("Inicio de exitoso");
          window.location.href = "https://apiprosig-production.up.railway.app/php/pagina_conductor.php";
        } else {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
        alert("Ha ocurrido un error");
      });
  });

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("username", document.getElementById("username").value);
    formData.append("email", document.getElementById("registerEmail").value);
    formData.append(
      "password",
      document.getElementById("registerPassword").value
    );

    fetch("https://apiprosig-production.up.railway.app/api/users", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Registro exitoso");
        } else {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
        alert("Ha ocurrido un error");
      });
  });

// Coordenadas de la ruta (obtenidas manualmente de Google Maps)
var allRouteCoordinates = {
  "Ruta 1 Sur - Norte": [
    [3.324761, -76.53401],
    [3.325626, -76.533704],
    [3.326231, -76.533484],
    [3.327104, -76.533187],
    [3.327447, -76.533071],
    [3.327898, -76.532926],
    [3.32822, -76.532891],
    [3.329971, -76.532763],
    [3.332296, -76.532644],
    [3.333235, -76.532594],
    [3.334294, -76.532348],
    [3.336457, -76.531854],
    [3.338647, -76.531352],
    [3.339136, -76.531291],
    [3.340074, -76.531165],
    [3.341187, -76.53103],
    [3.34188, -76.530986],
    [3.344079, -76.530758],
    [3.344196, -76.530727],
    [3.345806, -76.530604],
    [3.350658, -76.530237],
    [3.35252, -76.530161],
    [3.355199, -76.53027],
    [3.359776, -76.530448],
    [3.360371, -76.530677],
    [3.363135, -76.531665],
    [3.363563, -76.531773],
    [3.363879, -76.531796],
    [3.363955, -76.531755],
    [3.364139, -76.531731],
    [3.364369, -76.531591],
    [3.365331, -76.530961],
    [3.36709, -76.529816],
    [3.367417, -76.529613],
    [3.368843, -76.529505],
    [3.37031, -76.529441],
    [3.370318, -76.529532],
    [3.370284, -76.529622],
    [3.368011, -76.529758],
    [3.367787, -76.529843],
    [3.367736, -76.530057],
    [3.367812, -76.530284],
    [3.368661, -76.531875],
    [3.370236, -76.534965],
    [3.371197, -76.536772],
    [3.37133, -76.536908],
    [3.371595, -76.537094],
    [3.375138, -76.537198],
    [3.37803, -76.537321],
    [3.381179, -76.537808],
    [3.382791, -76.53806],
    [3.385142, -76.538404],
    [3.38667, -76.53849],
    [3.387837, -76.538538],
    [3.389249, -76.538485],
    [3.39014, -76.538437],
    [3.397186, -76.537868],
    [3.398244, -76.537777],
    [3.401995, -76.536545],
    [3.404848, -76.535597],
    [3.405051, -76.535305],
    [3.404232, -76.532812],
    [3.403718, -76.531238],
    [3.406804, -76.530407],
    [3.415157, -76.528102],
    [3.418221, -76.527234],
    [3.422966, -76.527446],
    [3.428693, -76.527746],
    [3.428939, -76.527699],
    [3.429521, -76.527323],
    [3.430234, -76.526859],
    [3.430642, -76.526802],
    [3.430938, -76.526845],
    [3.431367, -76.527066],
    [3.432496, -76.527816],
    [3.432875, -76.527889],
    [3.438952, -76.528242],
    [3.440018, -76.528438],
    [3.442766, -76.528622],
    [3.442749, -76.529578],
    [3.442704, -76.530806],
    [3.444195, -76.53071],
    [3.444646, -76.530774],
    [3.447222, -76.531502],
    [3.447563, -76.53036],
    [3.447692, -76.529922],
    [3.447883, -76.527597],
    [3.449236, -76.522661],
    [3.448931, -76.522583],
    [3.448731, -76.523256],
    [3.450593, -76.523851],
    [3.451469, -76.524134],
    [3.451278, -76.524713],
    [3.450906, -76.525763],
    [3.451988, -76.526232],
    [3.453414, -76.526841],
    [3.453971, -76.527044],
    [3.454568, -76.525712],
    [3.456804, -76.520739],
    [3.457366, -76.518618],
    [3.458136, -76.515426],
    [3.458531, -76.514322],
    [3.459707, -76.510569],
    [3.460891, -76.506806],
    [3.461364, -76.505297],
    [3.46249, -76.505766],
    [3.465166, -76.506937],
    [3.466164, -76.507376],
    [3.466536, -76.506713],
    [3.467101, -76.505106],
    [3.468013, -76.502216],
    [3.467896, -76.502012],
    [3.467995, -76.501779],
    [3.468185, -76.501717],
    [3.468522, -76.50062],
    [3.470254, -76.494992],
    [3.471116, -76.492174],
    [3.472629, -76.49263],
    [3.474578, -76.493203],
    [3.475364, -76.490658],
    [3.476155, -76.488137],
    [3.475508, -76.487948],
    [3.474801, -76.48754],
    [3.47471, -76.487304],
    [3.474967, -76.487122],
    [3.475306, -76.487207],
    [3.478986, -76.488364],
    [3.481276, -76.489079],
    [3.483202, -76.489726],
    [3.483914, -76.490214],
    [3.484551, -76.490957],
    [3.485031, -76.49201],
    [3.48655, -76.496761],
    [3.487334, -76.49874],
    [3.487591, -76.498654],
    [3.488726, -76.498362],
    [3.489046, -76.498346],
    [3.489537, -76.497975],
    [3.491429, -76.496679],
    [3.494061, -76.494959],
    [3.495221, -76.494327],
    [3.498172, -76.492653],
    [3.499039, -76.49214],
    [3.498813, -76.491803],
    [3.496765, -76.487857],
    [3.496231, -76.486858],
    [3.495977, -76.487118],
    [3.495685, -76.487558],
    [3.495454, -76.487525],
    [3.494468, -76.48738],
    [3.493991, -76.487311],
    [3.494054, -76.486942],
    [3.494124, -76.486504],
    [3.493628, -76.486417],
    [3.492987, -76.486323],
    [3.492465, -76.486216],
    [3.492536, -76.485826],
    [3.492779, -76.484902],
  ],
  "Ruta 1 Norte - Sur": [
    [3.493422, -76.500783],
    [3.493896, -76.500397],
    [3.49512, -76.50158],
    [3.495204, -76.501704],
    [3.495235, -76.501842],
    [3.494256, -76.50224],
    [3.494333, -76.502443],
    [3.494511, -76.502549],
    [3.495781, -76.50318],
    [3.495286, -76.504326],
    [3.493432, -76.503374],
    [3.493398, -76.503342],
    [3.493168, -76.503107],
    [3.492678, -76.503589],
    [3.492259, -76.504154],
    [3.491428, -76.505],
    [3.489728, -76.506611],
    [3.490511, -76.509238],
    [3.49054, -76.509533],
    [3.490779, -76.510049],
    [3.490772, -76.510542],
    [3.490607, -76.510718],
    [3.49039, -76.510737],
    [3.490069, -76.510447],
    [3.489879, -76.509989],
    [3.489948, -76.508556],
    [3.489253, -76.505996],
    [3.488587, -76.503971],
    [3.487509, -76.501846],
    [3.487056, -76.500271],
    [3.486692, -76.499145],
    [3.486663, -76.49815],
    [3.486004, -76.495835],
    [3.485822, -76.495207],
    [3.485228, -76.493813],
    [3.484998, -76.492394],
    [3.484331, -76.491211],
    [3.483356, -76.490396],
    [3.482124, -76.489923],
    [3.480072, -76.489282],
    [3.477641, -76.488524],
    [3.47761, -76.488608],
    [3.476564, -76.488283],
    [3.4764, -76.488338],
    [3.476244, -76.488459],
    [3.474677, -76.493481],
    [3.471431, -76.492484],
    [3.471099, -76.492669],
    [3.468318, -76.501788],
    [3.468408, -76.501898],
    [3.46841, -76.50207],
    [3.468325, -76.502195],
    [3.468152, -76.502243],
    [3.467609, -76.503935],
    [3.466985, -76.505862],
    [3.466615, -76.506802],
    [3.465749, -76.508228],
    [3.465805, -76.508426],
    [3.469031, -76.509258],
    [3.470461, -76.510173],
    [3.470625, -76.510374],
    [3.472202, -76.511675],
    [3.470409, -76.513802],
    [3.469343, -76.515061],
    [3.4682, -76.5163],
    [3.467824, -76.516754],
    [3.467946, -76.516814],
    [3.468124, -76.517019],
    [3.471086, -76.520894],
    [3.471329, -76.521066],
    [3.471613, -76.521157],
    [3.471716, -76.521346],
    [3.471683, -76.521608],
    [3.471564, -76.521746],
    [3.471357, -76.521841],
    [3.471113, -76.52188],
    [3.471064, -76.52185],
    [3.467469, -76.523731],
    [3.467072, -76.523965],
    [3.466432, -76.523965],
    [3.466313, -76.524002],
    [3.465987, -76.524307],
    [3.465674, -76.524404],
    [3.465355, -76.524243],
    [3.465237, -76.52394],
    [3.465302, -76.523687],
    [3.465375, -76.523543],
    [3.464273, -76.522502],
    [3.462888, -76.522053],
    [3.462691, -76.522097],
    [3.462599, -76.522208],
    [3.462726, -76.522958],
    [3.462741, -76.523448],
    [3.462634, -76.524021],
    [3.462421, -76.524516],
    [3.461817, -76.525156],
    [3.461466, -76.525368],
    [3.46127, -76.525644],
    [3.461104, -76.52588],
    [3.460442, -76.526746],
    [3.460073, -76.527137],
    [3.458427, -76.528196],
    [3.458267, -76.528391],
    [3.458111, -76.528835],
    [3.458018, -76.529401],
    [3.457988, -76.530269],
    [3.457857, -76.530612],
    [3.457733, -76.530781],
    [3.456501, -76.532157],
    [3.45556, -76.533543],
    [3.455212, -76.534114],
    [3.453776, -76.535751],
    [3.45351, -76.535875],
    [3.453209, -76.535941],
    [3.452886, -76.535954],
    [3.452687, -76.536027],
    [3.452589, -76.536126],
    [3.452449, -76.536292],
    [3.452049, -76.536718],
    [3.451709, -76.537293],
    [3.451414, -76.537656],
    [3.451162, -76.537884],
    [3.451028, -76.537955],
    [3.450874, -76.537989],
    [3.450695, -76.537953],
    [3.4481012356673713, -76.53700053691865],
    [3.4467143656068964, -76.53674304485322],
    [3.445794401666232, -76.53664112091064],
    [3.442244354250977, -76.53671622276308],
    [3.441456812405338, -76.53664648532869],
    [3.4414029517578455, -76.53656065464021],
    [3.4414680798348285, -76.53648555278778],
    [3.4422385916171865, -76.53661966323853],
    [3.444540512988372, -76.53656601905824],
    [3.4461149505900157, -76.53639435768129],
    [3.446243959109654, -76.53624951839448],
    [3.446303057659514, -76.53615295886995],
    [3.4464097120500643, -76.53563797473909],
    [3.446447007141476, -76.5355896949768],
    [3.446939506870392, -76.53259098529817],
    [3.442489636486315, -76.53197407722475],
    [3.4423188733772445, -76.53193116188051],
    [3.442533004654111, -76.53093338012697],
    [3.4426080336251896, -76.52873396873476],
    [3.4330553464622833, -76.5281116962433],
    [3.4326591996259452, -76.52803122997285],
    [3.431047051420188, -76.52702808380128],
    [3.430549190133964, -76.52694225311281],
    [3.4302601092681217, -76.52700662612916],
    [3.4288521771347775, -76.52792930603027],
    [3.4287601386395625, -76.52795612812044],
    [3.4182598912375166, -76.52739286422731],
    [3.407694879273052, -76.53033792972566],
    [3.408920381655858, -76.53418958187105],
    [3.4091345204047894, -76.53428077697755],
    [3.4103925845917664, -76.53387844562532],
    [3.410446119201489, -76.53401255607606],
    [3.398269874359257, -76.53798758983613],
    [3.3975357166297475, -76.53807878494264],
    [3.3875274270445384, -76.53871715068819],
    [3.386493894093735, -76.53866350650789],
    [3.3848549310939875, -76.53854548931122],
    [3.378161122768239, -76.5375316143036],
    [3.3772779582869936, -76.53746187686922],
    [3.376227759058736, -76.53742432594301],
    [3.376190283505196, -76.53734385967256],
    [3.376243820009817, -76.53723657131196],
    [3.3781398495246173, -76.53732240200044],
    [3.3794624526200203, -76.5375316143036],
    [3.3796019413423504, -76.53749406337738],
    [3.3800464121420615, -76.53747260570528],
    [3.3801212464012615, -76.53736531734468],
    [3.380134518119687, -76.53724248624937],
    [3.3795802980879834, -76.5292274951935],
    [3.3793983765659874, -76.52907729148866],
    [3.3793237986583367, -76.52903437614442],
    [3.3674939565293576, -76.52975857257844],
    [3.367150951175764, -76.52986586093904],
    [3.364115066165658, -76.53197944164278],
    [3.3639967890431564, -76.53208673000337],
    [3.3638846086349856, -76.53208673000337],
    [3.359857732927417, -76.53063833713533],
    [3.3523873803896516, -76.53030574321748],
    [3.3440014740578223, -76.53085827827455],
    [3.341307377823458, -76.53109967708589],
    [3.3384742589407805, -76.53145909309389],
    [3.3331887287385804, -76.53269827365877],
    [3.3281970118445936, -76.53295576572418],
    [3.3275705469703, -76.53313279151917],
    [3.3246849317143794, -76.5341627597809],
    [3.3246688699171694, -76.5340393781662],
    [3.3274417134949434, -76.5330469608307],
    [3.3280580257158423, -76.53289139270784],
    [3.332175611174455, -76.53262853622438],
  ],
};

// Lista de puntos de referencia con sus coordenadas
var routes = {
  "Ruta 1 Sur - Norte": [
    { name: "CAÑAS GORDAS", coords: [3.324761, -76.53401] },
    { name: "ICESI", coords: [3.341837, -76.530986] },
    { name: "JAVERIANA", coords: [3.348674, -76.530412] },
    { name: "CIUDAD JARDIN", coords: [3.360371, -76.530677] },
    { name: "ENTRADA MOTOS UNIVALLE", coords: [3.370258, -76.534817] },
    { name: "UNIVALLE", coords: [3.375138, -76.537198] },
    { name: "CALLE 13 CON KR 68 Y 66", coords: [3.397186, -76.537868] },
    { name: "CALLE 14 ENTRE 34 Y 33A", coords: [3.422966, -76.527446] },
    { name: "CALLE 13", coords: [3.440018, -76.528438] },
    { name: "CALLE 20 ", coords: [3.450593, -76.523851] },
    { name: "CRA 5", coords: [3.456781, -76.520733] },
    { name: "CRA 5 ENTRE CL 44 Y 44B", coords: [3.460891, -76.506806] },
    { name: "CRA 2DA CON CL 59B Y 59C", coords: [3.470254, -76.494992] },
    { name: "AUTO ORIENTAL", coords: [3.478986, -76.488364] },
    { name: "KR 4AN", coords: [3.489537, -76.497975] },
    { name: "CL 84", coords: [3.498803, -76.49181] },
    { name: "CL 84 ENTRE KR 2NBIS Y 2AN", coords: [3.496765, -76.487857] },
    { name: "CL 82NTE", coords: [3.493521, -76.486372] },
  ],

  "Ruta 1 Norte - Sur": [
    { name: "MENGA", coords: [3.489706, -76.507705] },
    { name: "CL 70 ENTRE KR 1 Y 1A5", coords: [3.485134, -76.493313] },
    { name: "Cl 70 entre Kr 1C1 y 1D", coords: [3.476652, -76.488313] },
    { name: "Kr 2 entre Cl 49 y 47", coords: [3.467683, -76.503650] },
    { name: "Cl 44 entre Kr 2N y 3AN", coords: [3.470998, -76.510677] },
    { name: "Cl 34 entre Av 2B y 2F", coords: [3.470280, -76.519824] },
    { name: "Cl 25 entre Av 2DN y 2CN", coords: [3.463844, -76.522361] },
    { name: "Av 1N entre Cl 17 y 15", coords: [3.457906, -76.530456] },
    { name: "Cl 10 entre Kr 10 ", coords: [3.446698, -76.532564] },
    { name: "Cl 13 entre Kr 20 y 21", coords: [3.438334, -76.528407] },
    { name: "Cl 14 entre Kr 31 y 32", coords: [3.426120, -76.527806] },
    { name: "Cl 14 entre Kr 42Bs y 43", coords: [3.415255, -76.528246] },
    { name: "Cl 13 entre Kr 67 y 68", coords: [3.396277, -76.538165] },
    { name: "Cl 13 con Kr 83 / Parque del Ingenio", coords: [3.382150, -76.538154] },
    { name: "Kr 86 entre Cl 14 y 16 Univalle", coords: [3.379826, -76.532559] },
    { name: "JARDIN PLAZA", coords: [3.370075, -76.529619] },
    { name: "JAVERIANA", coords: [3.348172, -76.530579] },
    { name: "ICESI", coords: [3.341301, -76.531110] },
  ],
};

map.on('click', function(e) {
  var lat = e.latlng.lat.toFixed(6);
  var lng = e.latlng.lng.toFixed(6);
  alert('Coordenadas: ' + lat + ', ' + lng);
});

// Crear ícono personalizado
var customIcon = L.icon({
  iconUrl: "src/ruta.png", // Asegúrate de que la ruta a la imagen sea correcta
  iconSize: [80, 80], // Tamaño del ícono
  popupAnchor: [1, -34], // Punto desde el cual se abrirá el popup relativo al icono
});
  
// Función para mostrar la ruta y los puntos de referencia
function showRoute(routeId) {
  var routeInput = document.getElementById("routeInput").value;
  routeId = routeId || routeInput;

  // Convertir routeId a cadena para asegurar que se compara correctamente con las claves de texto
  routeId = routeId.toString();

  if (routes[routeId] && allRouteCoordinates[routeId]) {
    // Limpia las capas existentes en el mapa, excepto la capa base y el marcador del usuario
    map.eachLayer(function (layer) {
      if (layer !== userMarker && layer !== map._baseLayer) {
        map.removeLayer(layer);
      }
    });

    // Añadir capa de mapa base nuevamente
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

    // Añadir la línea de la ruta al mapa con estilo discontínuo
    var polyline = L.polyline(allRouteCoordinates[routeId], {
      color: "red",
      dashArray: "5, 10", // Patrón de guiones (5 píxeles de línea, 10 píxeles de espacio)
      weight: 2, // Grosor de la línea
    }).addTo(map);

    // Añadir puntos de referencia al mapa
    routes[routeId].forEach(function (point) {
      L.marker(point.coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(point.name);
    });

    // Ajustar la vista del mapa para incluir la ruta completa y los puntos de referencia
    var bounds = L.latLngBounds(
      allRouteCoordinates[routeId].concat(
        routes[routeId].map((point) => point.coords)
      )
    );
    map.fitBounds(bounds);
  } else {
    alert("Ruta no encontrada");
  }
}

// Función para filtrar las rutas y mostrar el menú desplegable
function filterRoutes() {
  var input = document.getElementById("routeInput").value.toLowerCase();
  var dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.innerHTML = ""; // Limpiar el menú

  // Filtrar rutas por coincidencia de texto
  for (var routeId in routes) {
    if (routeId.toLowerCase().includes(input)) {
      var li = document.createElement("li");
      li.textContent = routeId;
      li.onclick = (function (routeIdCopy) {
        return function () {
          document.getElementById("routeInput").value = routeIdCopy; // Completa el valor del input con la ruta seleccionada
          showRoute(routeIdCopy);
          dropdownMenu.style.display = "none";
        };
      })(routeId);
      dropdownMenu.appendChild(li);
    }
  }
                     
  
  // Mostrar u ocultar el menú desplegable
  if (input === "") {
    dropdownMenu.style.display = "none";
  } else if (dropdownMenu.children.length > 0) {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
}

// Función para manejar el evento de presionar Enter
function handleEnter(event) {
  if (event.key === "Enter") {
    showRoute();
    document.getElementById("dropdownMenu").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const closeIcon = document.querySelector(".modal .close-icon");

  closeIcon.addEventListener("click", function () {
    // Añadir la clase close-popup para activar la animación
    modal.classList.add("close-popup");
    // Esperar hasta que la animación termine antes de quitar el modal de la pantalla
    setTimeout(() => {
      modal.classList.remove("activate-popup");
      modal.classList.remove("close-popup");
      modal.style.left = "-100%"; // Reestablecer posición
    }, 500); // Tiempo en ms correspondiente a la duración de la animación
      // Esperar hasta que la animación termine antes de quitar el modal de la pantalla
      setTimeout(() => {
          modal.classList.remove('activate-popup');
          modal.classList.remove('close-popup');
          modal.style.left = '-200%'; // Reestablecer posición
      }, 500); // Tiempo en ms correspndiente a la duración de la animación
  });
});

const panel = document.querySelector(".panel");
