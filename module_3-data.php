<?php
    opcache_reset();
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $database = "base_de_mon_jeu"; 
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("La connexion a échoué: " . $conn->connect_error);
    }

    if ($conn->connect_error) {
        die("La connexion a échoué: " . $conn->connect_error);
    }

    $sql = "SELECT name_mot, code, correspondance, liste_de_mot FROM mots_principaux ORDER BY RAND() LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $mainWord = $row["name_mot"];
        $code = $row["code"];
        $correspondance = $row["correspondance"];
        $associatedWords = explode(",", $row["liste_de_mot"]); 

        // Requête SQL pour récupérer les mots de liste_de_mot non associés
        $sql = "SELECT name_mot FROM mots_principaux WHERE name_mot NOT IN ('" . implode("','", $associatedWords) . "')";
        $notAssociatedResult = $conn->query($sql);
        $notAssociatedWords = [];
        if ($notAssociatedResult->num_rows > 0) {
            while ($row = $notAssociatedResult->fetch_assoc()) {
                $notAssociatedWords[] = $row["name_mot"];
            }
        }
    } else {
        $mainWord = "Aucun mot principal trouvé";
        $code = "000000"; 
        $correspondance = "";
        $associatedWords = [];
        $notAssociatedWords = [];
    }

    function placeValidWordRandomly($correspondance, $code, $associatedWords, $notAssociatedWords) {
        $tableRow = "<tr>";
        $emptySlots = [];
        for ($i = 0; $i < strlen($code); $i++) {
            if ($code[$i] == "0") {
                $emptySlots[] = $i;
            }
        }
        $randomIndex = array_rand($emptySlots);
        $randomSlot = $emptySlots[$randomIndex];
        $colCount = 0;
        for ($i = 0; $i < strlen($code); $i++) {
            if ($code[$i] == "1") {
                $tableRow .= "<td class='correspondance' style='background: url(assets/boutonCliquable.png);'>$correspondance</button></td>";
            } elseif ($i == $randomSlot) {
                $randomAssociatedWordIndex = array_rand($associatedWords);
                $randomAssociatedWord = $associatedWords[$randomAssociatedWordIndex];
                $tableRow .= "<td class='result' style='background: url(assets/boutonCliquable.png);'>$randomAssociatedWord</button></td>";
            } else {
                shuffle($notAssociatedWords); 
                $randomOtherWord = $notAssociatedWords[array_rand($notAssociatedWords)];
                $tableRow .= "<td class='OtherWord' style='background: url(assets/boutonCliquable.png);'>$randomOtherWord</button></td>";
            }
            $colCount++;
            if ($colCount == 2) {
                $tableRow .= "</tr><tr>";
                $colCount = 0;
            }
        }
        $tableRow .= "</tr>";
        return $tableRow;
    }
    

    $conn->close();
    echo "<tr class='main-word'><th colspan='2'>".$mainWord."</th></tr>";
    echo placeValidWordRandomly($correspondance, $code, $associatedWords, $notAssociatedWords);
?>