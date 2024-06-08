<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    error_log("User ID not set in session");
    header("Location: ../index.html");
    exit();
} else {
    error_log("User ID: " . $_SESSION['user_id']);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualizar Ubicación del Autobús</title>
    <script>
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

        document.addEventListener("DOMContentLoaded", function() {
            fetch("obtener_ruta_registrada.php")
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('registeredRoute').innerText = "Ruta registrada: " + data.route_id + " (" + data.bus_name + ")";
                        document.getElementById('busName').value = data.bus_name;
                    } else {
                        document.getElementById('registeredRoute').innerText = "No hay ruta registrada.";
                    }
                });

            document.getElementById('deleteRoute').addEventListener('click', function() {
                if (confirm("¿Estás seguro de eliminar la ruta registrada?")) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "eliminar_ruta.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send("user_id=<?php echo $_SESSION['user_id']; ?>");

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            alert(xhr.responseText);
                            location.reload(); // Recargar la página para reflejar los cambios
                        }
                    };
                }
            });
        });

        function registerRoute() {
            var routeId = document.getElementById('routeId').value;
            var busName = document.getElementById('busName').value;

            if (!routes.hasOwnProperty(routeId)) {
                alert("Ruta no válida.");
                return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "registrar_ruta.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("user_id=<?php echo $_SESSION['user_id']; ?>&route_id=" + routeId + "&bus_name=" + encodeURIComponent(busName) + "&valid_routes=" + encodeURIComponent(JSON.stringify(routes)));

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert(xhr.responseText);
                    location.reload(); // Recargar la página para reflejar los cambios
                }
            };
        }

        function updateLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "actualizar_ubicacion.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send("user_id=<?php echo $_SESSION['user_id']; ?>&latitude=" + lat + "&longitude=" + lon);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            console.log(xhr.responseText);
                        }
                    };
                });
            } else {
                alert("Geolocalización no es soportada por este navegador.");
            }
        }

        setInterval(updateLocation, 5000); // Actualiza la ubicación cada 5 segundos
    </script>
</head>
<body>
    <h1>Conductor</h1>
    <p>Esta página actualiza automáticamente la ubicación del autobús.</p>
    <p id="registeredRoute"></p>
    <button id="deleteRoute">Eliminar Ruta Registrada</button>
    <br><br>
    <label for="routeId">Número de Ruta:</label>
    <input type="text" id="routeId" />
    <br>
    <label for="busName">Nombre del Autobús:</label>
    <input type="text" id="busName" />
    <br>
    <button onclick="registerRoute()">Registrar Ruta</button>
    <br><br>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>
