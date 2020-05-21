<?php

include 'dbAccess.php';

$db = new dbAccess();

$recupAllAssocAutre = $db->callProcedure("appRecupAllAssocAutre");

echo json_encode($recupAllAssocAutre);