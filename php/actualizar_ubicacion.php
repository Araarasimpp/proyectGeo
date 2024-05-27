<?php
session_start();
include '../db.php';

if (!isset($_SESSION['user_id'])) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = pg_escape_string($conn, $_POST['user_id']);
    $latitude = pg_escape_string($conn, $_POST['latitude']);
    $longitude = pg_escape_string($conn, $_POST['longitude']);

    $sql = "UPDATE users SET latitude = '$latitude', longitude = '$longitude' WHERE id = '$user_id'";
    $result = pg_query($conn, $sql);

    if ($result) {
        echo "Ubicación actualizada correctamente.";
    } else {
        echo "Error al actualizar la ubicación.";
    }
}

pg_close($conn);
?>
