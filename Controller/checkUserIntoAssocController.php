<?php
session_start();

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);


$checkUserIntoAssoc = $db->callProcedure('checkUserIntoAssoc',[$conv{'id_user'}]);

echo json_encode($checkUserIntoAssoc);