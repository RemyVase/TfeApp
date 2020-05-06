<?php
include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$id = htmlspecialchars($obj["idUser"]);

$recupAllConversation = $db->callProcedure('messageRecupAllConversationsUser', [$id]);

echo json_encode($recupAllConversation);
die();