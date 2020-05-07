<?php
include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idConv = htmlspecialchars($obj["idConv"]);

$recupAllMessage = $db->callProcedure('messageRecupAllMessage',[$idConv]);

echo json_encode($recupAllMessage);