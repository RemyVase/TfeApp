<?php

include 'dbAccess.php';

$db = new dbAccess();

$recupAllAssocChats = $db->callProcedure("appRecupAllAssocChats");

echo json_encode($recupAllAssocChats);