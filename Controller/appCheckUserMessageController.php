<?php
session_start();

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idConv = htmlspecialchars($obj["idConv"]);

$checkUser = $db->callProcedure('messageCheckUser',[$idConv]);

echo json_encode($checkUser);