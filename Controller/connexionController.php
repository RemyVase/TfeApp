<?php
session_start();

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$pseudo = htmlspecialchars($obj["pseudoUser"]);
$password = hash("sha256", htmlspecialchars($obj["passwordUser"]));


$checkPseudoPassword = $db->callProcedure("connexionUser", [$pseudo, $password]);
if (empty($checkPseudoPassword)) {
    echo json_encode("mdpPasOk");
} else {
    echo json_encode($checkPseudoPassword);
}
