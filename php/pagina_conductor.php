<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: ../index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualizar Ubicación del Autobús</title>
    <script>
        function registerRoute() {
            var routeId = document.getElementById('routeId').value;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "registrar_ruta.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("user_id=<?php echo $_SESSION['user_id']; ?>&route_id=" + routeId);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
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
    <label for="routeId">Número de Ruta:</label>
    <input type="text" id="routeId" />
    <button onclick="registerRoute()">Registrar Ruta</button>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>
