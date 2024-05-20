<?php
// config.php
$host = "your-aws-rds-endpoint";
$dbname = "bus_tracking";
$user = "nombre de usuario de base datos";
$password = "contraseña de base de datos";

// Creando la coneccion
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

// Verificando la coneccion
if (!$conn) {
    die("Conexion fallida: " . pg_last_error());
}
?>
