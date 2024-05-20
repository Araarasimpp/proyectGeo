<?php
header('Content-Type: application/json');
require 'config.php';

$result = pg_query($conn, "SELECT latitude, longitude FROM bus_location ORDER BY timestamp DESC LIMIT 1");

if ($result) {
    $row = pg_fetch_assoc($result);
    echo json_encode($row);
} else {
    echo json_encode(['latitude' => 0, 'longitude' => 0]);
}

pg_close($conn);
?>
