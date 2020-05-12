<?php

include 'dbAccess.php';

$db = new dbAccess();
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$pseudo = htmlspecialchars($obj["pseudoUser"]);
$email = htmlspecialchars($obj["mailUser"]);
$password = hash("sha256",htmlspecialchars($obj["passwordUser"]));


$checkEmail = $db->callProcedure("checkMail", [$email]);
$checkPseudo = $db->callProcedure("checkPseudo", [$pseudo]);

if (!empty($checkEmail)) {
    if (!empty($checkPseudo)) {
        echo json_encode("mailPseudoPasOk");
    } else {
        echo json_encode("mailPasOk");
    }
} else if (!empty($checkPseudo)) {
    echo json_encode("pseudoPasOk");
} else {
    $inscription = $db->callProcedure('ajoutUser', [$pseudo, $email, $password]);
    echo json_encode("ok");
}
