<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $route_id = pg_escape_string($conn, $_GET['route_id']);

    $sql = "SELECT latitude, longitude FROM users WHERE route_id = '$route_id' LIMIT 1";
    $result = pg_query($conn, $sql);
    $row = pg_fetch_assoc($result);

    if ($row) {
        echo json_encode(['success' => true, 'latitude' => $row['latitude'], 'longitude' => $row['longitude']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo encontrar la ubicación del conductor.']);
    }
}

pg_close($conn);
?>
