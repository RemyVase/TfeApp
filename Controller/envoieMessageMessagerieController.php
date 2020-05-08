<?php

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idConv = ($obj["idConv"]);
$idEnvoyeur = ($obj['idEnvoyeur']);
$message = ($obj['message']);

$envoiMessage = $db->callProcedure('messageEnvoiMessage', [$idEnvoyeur, $idConv, $message]);

echo json_encode('messageEnvoye');