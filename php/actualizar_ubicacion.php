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

    // Verificar si el usuario tiene una ruta registrada
    $check_sql = "SELECT route_id FROM users WHERE id = '$user_id'";
    $check_result = pg_query($conn, $check_sql);
    $row = pg_fetch_assoc($check_result);

    if (!$row['route_id']) {
        echo "El usuario no tiene una ruta registrada.";
        exit();
    }

    // Actualizar la ubicación en la tabla buses
    $sql = "UPDATE locations SET latitude = '$latitude', longitude = '$longitude', update_at = NOW() WHERE id = (SELECT some_value::INTEGER FROM some_table WHERE condition = '$user_id')";
    $result = pg_query($conn, $sql);

    if ($result) {
        echo "Ubicación actualizada correctamente.";
    } else {
        echo "Error al actualizar la ubicación.";
    }
}

pg_close($conn);
?>
