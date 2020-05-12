<?php
session_start();

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idConv = $obj["idConv"];
$idAssocCo = $obj["idAssocCo"];

$recupPseudoAssocConv = $db->callProcedure('messagePseudoConvAssoc', [$idConv, $idAssocCo]);

echo json_encode($recupPseudoAssocConv);