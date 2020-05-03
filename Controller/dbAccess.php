<?php

class dbAccess
{

    private $pdo = null;

    public function connexionDB()
    {
        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=tfe;charset=utf8", "root", "root");
        } catch (Exception $e) {
            die("Erreur :" . $e->getMessage());
        }
    }

    public function callProcedure($nomProcedure, $procParams = array())
    {
        $params = array();
        switch ($nomProcedure) {
            case 'checkNbAssoc':
            case 'checkNbAnimaux':
            case 'checkNbOffre':
            case 'checkNbDemande':
            case 'recupAllMembre':
            case 'messageTakeLastConvCree':
                array_push($params);

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'checkMail':
            case 'checkPseudo':
            case 'checkPassword':
            case 'checkUserIntoAssoc':
            case 'deleteAnimal':
            case 'deleteDemande':
            case 'deleteOffre':
            case 'deleteAssoc':
            case 'recupOneAssoc':
            case 'recupMonAssoc':
            case 'checkAssoc':
            case 'recupOneAnimal':
            case 'checkNbNosAnimaux':
            case 'checkNbMesOffres':
            case 'checkNbNosDemandes':
            case 'recupOneAnnonce':
            case 'recupOneDemande':
            case 'recupIdAssoc':
            case 'checkSiDejaDansAssoc':
            case 'recupAllMembreAssoc':
            case 'checkNbAssocTypeAnimal':
            case 'checkNbAnimauxTypeAnimal':
            case 'checkNbOffreTypeAnimal':
            case 'checkNbOffreTypeObjet':
            case 'checkNbOffreEtat':
            case 'checkNbDemandeTypeAnimal':
            case 'checkNbDemandeTypeObjet':
            case 'messageCreateConvers':
            case 'messageRecupAllConversationsUser':
            case 'messageRecupAllMessage':
            case 'messageCheckAssocConv':
            case 'messageCheckUserConv2':
            case 'messageRecupAllConversationsAssoc':
            case 'messageLu':
            case 'messageCheckEnvoyeurLastMessage':
            case 'messageCheckSiEnvoyeurDansAssoc':
            case 'messageRecupPseudoUser':
            case 'messageCheckUser':
                array_push($params, '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'connexionUser':
            case 'gestionDeCompte':
            case 'recupAllAssoc':
            case 'modifImgAssoc':
            case 'recupAllAnimaux':
            case 'modifImgAnimal':
            case 'recupAllOffres':
            case 'recupAllDemandes':
            case 'checkUserAnnonce':
            case 'modifImgOffre':
            case 'checkAssocDemande':
            case 'modifImgDemande':
            case 'checkAssocAnimal':
            case 'addIdAssocIntoUser':
            case 'modifSelectAnimal':
            case 'modifSelectAssoc':
            case 'ajoutMembreAssoc':
            case 'messageCheckUserConv':
            case 'messageLierConversation':
            case 'messageRecupAllConversAssocUser':
            case 'supprimerMembreAssoc':
            case 'messageCheckAssocToAssocConv':
            case 'messageLierConversationToAssoc':
            case 'messageCheckSiFraude':
            case 'messageCheckSiFraudeAssoc':
            case 'messageCheckSiFraudeAssocConvers':
            case 'messagePseudoConvAssoc':
                array_push($params, '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'ajoutUser':
            case 'checkAnimal':
            case 'recupAllNosAnimaux':
            case 'checkOffre':
            case 'recupAllMesOffres':
            case 'recupAllNosDemandes':
            case 'modifSelectDemande':
            case 'checkDemande':
            case 'recupAllAssocTypeAnimal':
            case 'recupAllAnimauxTypeAnimal':
            case 'recupAllOffresTypeAnimal':
            case 'recupAllOffresTypeObjet':
            case 'recupAllOffresEtat':
            case 'recupAllDemandesTypeAnimal':
            case 'recupAllDemandesTypeObjet':
            case 'messageEnvoiMessage':
                array_push($params, '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'modifDemande':
            case 'modifOffre':
            case 'modifSelectOffre':
                array_push($params, '?', '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'modifAnimal':
                array_push($params, '?', '?', '?', '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'ajoutAnimal':
            case 'ajoutDemande':
                array_push($params, '?', '?', '?', '?', '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'ajoutOffre':
                array_push($params, '?', '?', '?', '?', '?', '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'modifAssoc':
                array_push($params, '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
        switch ($nomProcedure) {
            case 'ajoutAssoc':
                array_push($params, '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?');

                try {
                    $this->connexionDB();
                    $procedureCall = 'call ' . $nomProcedure . '(' . join(',', $params) . ')';
                    $requete = $this->pdo->prepare($procedureCall);
                    $requete->execute($procParams);
                    return $requete->fetchAll();
                } catch (Exception $e) {
                    die("Erreur :" . $e->getMessage());
                }
                break;
        }
    }
}
