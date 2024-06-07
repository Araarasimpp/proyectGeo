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
        // Obtener el nombre del bus asociado al usuario
        $sql_bus = "SELECT bus_name FROM users WHERE id = '$user_id'";
        $result_bus = pg_query($conn, $sql_bus);
        if ($row = pg_fetch_assoc($result_bus)) {
            $bus_name = $row['bus_name'];
    
            // Eliminar el bus de la tabla de buses
            $sql_delete_bus = "DELETE FROM buses WHERE bus_name = '$bus_name'";
            $result_delete_bus = pg_query($conn, $sql_delete_bus);
    
            if ($result_delete_bus) {
                echo "Ruta y bus eliminados correctamente.";
            } else {
                echo "Error al eliminar el bus.";
            }
        } else {
            echo "Error al obtener el nombre del bus.";
        }
    } else {
        echo "Error al eliminar la ruta.";
    }
}

pg_close($conn);
?>
