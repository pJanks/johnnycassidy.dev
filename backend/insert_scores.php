<?php
try {
    require_once '../config.php';
    $dateTime = new DateTime();
    $date = $dateTime->format('m.d.y h:i:s A T');

    extract(json_decode(file_get_contents('php://input'), true));

    $sql = 'INSERT INTO scores
      (score, name, time, pills_eaten)
    VALUES (:score, :name, :time, :pills_eaten)';
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':score', $score);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':time', $time);
    $stmt->bindParam(':pills_eaten', $pillsEaten);
    $stmt->execute();

    $ip = $_SERVER['REMOTE_ADDR'];

    if ($ip !== $myIp) {
      $successMessage = "$date $ip inserted into scores\n";
      file_put_contents('logs/log.log', $successMessage, FILE_APPEND);
    }
    echo json_encode(['success' => true]);
    unset($stmt);
    unset($pdo);
  } catch(Exception $e) {
    $errorMessage = $e->getMessage();
    $errorLine = $e->getLine();
    $errorMessageToLog = "$date: ERROR INSERTING INTO scores: $errorMessage line: $errorLine\n";
    file_put_contents('/var/www/johnnycassidy.dev/logs/error.log', $errorMessageToLog, FILE_APPEND);
  }