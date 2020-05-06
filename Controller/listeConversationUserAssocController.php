<?php
include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idUserAssoc = htmlspecialchars($obj["idUserAssoc"]);

$recupAllConversation = $db->callProcedure('messageRecupAllConversationsAssoc', [$idUserAssoc]);

echo json_encode($recupAllConversation);
die();