<?php
session_start();

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idAssoc = htmlspecialchars($obj["idAssoc"]);

$recupNomAssoc = $db->callProcedure('appRecupNomAssoc', [$idAssoc]);

echo json_encode($recupNomAssoc);