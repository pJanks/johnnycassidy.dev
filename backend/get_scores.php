<?php
try {
    require_once '../config.php';
    $dateTime = new DateTime();
    $date = $dateTime->format('m.d.y h:i:s A T');

    $sql = 'SELECT * FROM scores ORDER BY score DESC LIMIT 10';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $scores = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      array_push($scores, $row);
    }

    $ip = $_SERVER['REMOTE_ADDR'];

    

    // if ($ip !== $myIp) {
      $successMessage = "$date $ip retrieved scores\n";
      file_put_contents('/var/www/johnnycassidy.dev/logs/log.log', $successMessage, FILE_APPEND);
    // }
    echo json_encode($scores, JSON_PRETTY_PRINT);
    unset($stmt);
    unset($pdo);
  } catch(Exception $e) {
    $errorMessage = $e->getMessage();
    $errorLine = $e->getLine();
    $errorMessageToLog = "$date: ERROR GETTING scores: $errorMessage line: $errorLine\n";
    file_put_contents('/var/www/johnnycassidy.dev/logs/error.log', $errorMessageToLog, FILE_APPEND);
    echo '<h1 style="color: #F00; font-size: 240%; font-weight: bold;">ERROR</h1>';
  }