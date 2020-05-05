<?php

include 'dbAccess.php';

$db = new dbAccess();

$recupAllAssoc = $db->callProcedure("appRecupAllAssoc");

echo json_encode($recupAllAssoc);
