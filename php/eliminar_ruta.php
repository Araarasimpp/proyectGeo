<?php
session_start();
include '../db.php';

if (!isset($_SESSION['user_id'])) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = pg_escape_string($conn, $_POST['user_id']);

    // Eliminar la ruta registrada
    $sql = "UPDATE users SET route_id = NULL, bus_name = NULL WHERE id = '$user_id'";
    $result = pg_query($conn, $sql);

    if ($result) {
        echo "Ruta eliminada correctamente.";
    } else {
        echo "Error al eliminar la ruta.";
    }
}

pg_close($conn);
?>
