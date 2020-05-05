<?php

include 'dbAccess.php';

$db = new dbAccess();

$recupAllAssocChiens = $db->callProcedure("appRecupAllAssocChiens");

echo json_encode($recupAllAssocChiens);