<?php

include 'dbAccess.php';

$db = new dbAccess();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$idConv = $obj["idConv"];
$idUserCo = $obj["idUserCo"];
$idAssocUserCo = $obj["idAssocUserCo"];


$checkEnvoyeurLastMessage = $db->callProcedure('messageCheckEnvoyeurLastMessage', [$idConv]);
$checkAssocUser = $db->callProcedure('messageCheckSiEnvoyeurDansAssoc', [$checkEnvoyeurLastMessage[0]{'id_envoyeur'}]);

//checker si l'id user et/ou l'id assoc de la session correspond bien à ceux lier à la conversation
if ($checkEnvoyeurLastMessage[0]{'id_envoyeur'} != $idUserCo) {
    if ($checkAssocUser[0]{'id_assoc'} != $idAssocUserCo) {
        $messageLu = $db->callProcedure('messageLu', [$idConv]);
        echo json_encode("messageLu");
    }else{
        echo json_encode("messagePasLu");
    }
} else {
    echo json_encode("messagePasLu");
}
