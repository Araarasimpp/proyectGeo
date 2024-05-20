<?php
require 'config.php';

// Registro del conductor
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $result = pg_query_params($conn, 'INSERT INTO drivers (name, email, password) VALUES ($1, $2, $3)', array($name, $email, $password));

    if ($result) {
        echo "Corrector";
    } else {
        echo "Error: " . pg_last_error($conn);
    }
}

pg_close($conn);
?>
