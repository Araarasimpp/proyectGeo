<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $route_id = pg_escape_string($conn, $_GET['route_id']);

    $sql = "SELECT latitude, longitude FROM buses WHERE id = '$route_id' LIMIT 1";
    $result = pg_query($conn, $sql);
    $row = pg_fetch_assoc($result);

    if ($row) {
        echo json_encode(['success' => true, 'latitude' => $row['latitude'], 'longitude' => $row['longitude']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró la ubicación.']);
    }
}

pg_close($conn);
?>
