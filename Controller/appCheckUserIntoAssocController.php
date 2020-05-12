<?php

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idEnvoyeur = htmlspecialchars($obj["idEnvoyeur"]);

$checkUserIntoAssoc = $db->callProcedure('checkUserIntoAssoc',[$idEnvoyeur]);

echo json_encode($checkUserIntoAssoc);