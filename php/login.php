<?php
session_start();
include '../db.php';

header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = ['success' => false];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = pg_escape_string($conn, $_POST['email']);
    $password = pg_escape_string($conn, $_POST['password']);

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = pg_query($conn, $sql);

    if (!$result) {
        $response['message'] = 'Error en la consulta: ' . pg_last_error($conn);
        echo json_encode($response);
        exit;
    }

    if (pg_num_rows($result) > 0) {
        $user = pg_fetch_assoc($result);
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $response['success'] = true;
        } else {
            $response['message'] = 'Contraseña incorrecta';
        }
    } else {
        $response['message'] = 'Usuario no encontrado';
    }
} else {
    $response['message'] = 'Método de solicitud no permitido';
}

echo json_encode($response);
pg_close($conn);
?>
