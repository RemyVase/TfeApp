<?php
include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idEnvoyeur = htmlspecialchars($obj["idEnvoyeur"]);
$idReceveur = htmlspecialchars($obj['idReceveur']);
$message = htmlspecialchars($obj['message']);
$idAssocUserCo = htmlspecialchars($obj['idAssocUserCo']);

var_dump($idAssocUserCo);

$checkUserConv = $db->callProcedure('messageCheckUserConv', [$idEnvoyeur, $idReceveur]);
$checkAssocToAssocConv = $db->callProcedure('messageCheckAssocToAssocConv', [$idAssocUserCo, $idReceveur]);


if (empty($idAssocUserCo)) {
    if (empty($checkUserConv)) {
        $conversation = $db->callProcedure('messageCreateConvers', [$idReceveur]);
        $idConvers = $db->callProcedure('messageTakeLastConvCree');
        $lierConversation = $db->callProcedure('messageLierConversation', [$idEnvoyeur, intval($idConvers[0]{
            'id_convers'})]);
        $envoiMessage = $db->callProcedure('messageEnvoiMessage', [$idEnvoyeur, $idConvers[0]{
            'id_convers'}, $message]);
    } else {
        $envoiMessage = $db->callProcedure('messageEnvoiMessage', [$idEnvoyeur, intval($checkUserConv[0]{
            'id_convers'}), $message]);
    }
} else {
    if (empty($checkAssocToAssocConv)) {
        $conversation = $db->callProcedure('messageCreateConvers', [$idReceveur]);
        $idConvers = $db->callProcedure('messageTakeLastConvCree');
        $lierConversation = $db->callProcedure('messageLierConversationToAssoc', [$idAssocUserCo, intval($idConvers[0]{
            'id_convers'})]);
        $envoiMessage = $db->callProcedure('messageEnvoiMessage', [$idEnvoyeur, $idConvers[0]{
            'id_convers'}, $message]);
    } else {
        $envoiMessage = $db->callProcedure('messageEnvoiMessage', [$idEnvoyeur, intval($checkAssocToAssocConv[0]{
            'id_convers'}), $message]);
    }
}

echo json_encode("messageEnvoye");
