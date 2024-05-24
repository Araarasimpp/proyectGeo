<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $bus_id = pg_escape_string($conn, $_POST['bus_id']);
    $latitude = pg_escape_string($conn, $_POST['latitude']);
    $longitude = pg_escape_string($conn, $_POST['longitude']);

    $sql = "UPDATE buses SET latitude = '$latitude', longitude = '$longitude' WHERE id = '$bus_id'";
    $result = pg_query($conn, $sql);

    if ($result) {
        echo "Ubicación actualizada correctamente.";
    } else {
        echo "Error al actualizar la ubicación.";
    }
}

pg_close($conn);
?>
