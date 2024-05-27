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

    // Verificar si la ruta existe en 'routes' array de JavaScript
    $valid_routes = array_keys(json_decode($_POST['valid_routes'], true));
    if (!in_array($route_id, $valid_routes)) {
        echo "La ruta no es válida.";
        exit();
    }

    // Verificar si el usuario ya tiene una ruta registrada
    $check_sql = "SELECT route_id FROM users WHERE id = '$user_id'";
    $check_result = pg_query($conn, $check_sql);
    $row = pg_fetch_assoc($check_result);

    if ($row['route_id']) {
        echo "El usuario ya tiene una ruta registrada.";
        exit();
    }

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
