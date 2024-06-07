<?php
session_start();
include '../db.php';

if (!isset($_SESSION['user_id'])) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

$user_id = pg_escape_string($conn, $_SESSION['user_id']);
$sql = "SELECT route_id, bus_name FROM users WHERE id = '$user_id'";
$result = pg_query($conn, $sql);
$row = pg_fetch_assoc($result);

if ($row) {
    echo json_encode(['success' => true, 'route_id' => $row['route_id'], 'bus_name' => $row['bus_name']]);
} else {
    echo json_encode(['success' => false, 'message' => 'No se encontró ninguna ruta registrada.']);
}

pg_close($conn);
?>
