<?php
include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idEnvoyeur = ($obj["idEnvoyeur"]);
$idReceveur = ($obj['idReceveur']);
$message = ($obj['message']);
$idAssocUserCo = ($obj['idAssocUserCo']);

$checkUserConv = $db->callProcedure('messageCheckUserConv', [$idEnvoyeur, $idReceveur]);

if(!is_null($idAssocUserCo)){
    $checkAssocToAssocConv = $db->callProcedure('messageCheckAssocToAssocConv', [$idAssocUserCo, $idReceveur]);
}

if (is_null($idAssocUserCo)) {
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



