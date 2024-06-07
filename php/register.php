<?php
include '../db.php';
header('Content-Type: application/json');


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = pg_escape_string($conn, $_POST['username']);
    $email = pg_escape_string($conn, $_POST['email']); 
    $password = password_hash(pg_escape_string($conn, $_POST['password']), PASSWORD_DEFAULT); 

    $sql = "INSERT INTO users(username, email, password) VALUES ('$username', '$email', '$password')";
    $result = pg_query($conn, $sql);

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario']);
    }
}

pg_close($conn);
?>
