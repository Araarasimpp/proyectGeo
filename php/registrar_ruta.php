<?php
session_start();
include '../db.php';

if (!isset($_SESSION['user_id'])) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = pg_escape_string($conn, $_POST['user_id']);
    $route_id = pg_escape_string($conn, $_POST['route_id']);

    $sql = "UPDATE users SET route_id = '$route_id' WHERE id = '$user_id'";
    $result = pg_query($conn, $sql);

    if ($result) {
        echo "Ruta registrada correctamente.";
    } else {
        echo "Error al registrar la ruta.";
    }
}

pg_close($conn);
?>
