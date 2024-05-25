<?php
$host = "localhost";
$port = '5432';
$dbname = "buses_db";
$user = "postgres";
$pass = "alander1209";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

if (!$conn) {
    echo "Error: No se pudo conectar a la base de datos.\n";
    exit;
}
?>
