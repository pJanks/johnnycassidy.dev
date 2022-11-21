<?php
try {
    require_once '../config.php';

    $scoreData = json_decode(file_get_contents('php://input'));
    $score = $scoreData->score;
    $name = $scoreData->name;
    $time = $scoreData->time;
    $pillsEaten = $scoreData->pillsEaten;
    
    $sql = 'INSERT INTO scores (score, name, time, pills_eaten) VALUES (:score, :name, :time, :pills_eaten)';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':score', $score);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':time', $time);
    $stmt->bindParam(':pills_eaten', $pillsEaten);
    $stmt->execute();

    $ip = $_SERVER['REMOTE_ADDR'];

    if ($ip !== $myIp) {
      $successMessage = "$formattedDate $ip inserted into scores\n";
      file_put_contents('../logs/log.log', $successMessage, FILE_APPEND);
    }
    echo json_encode(['success' => true]);
    unset($stmt);
    unset($pdo);
  } catch(Exception $e) {
    $errorMessage = $e->getMessage();
    $errorLine = $e->getLine();
    $errorMessageToLog = "$formattedDate: ERROR INSERTING INTO scores: $errorMessage line: $errorLine\n";
    file_put_contents('/var/www/johnnycassidy.dev/logs/error.log', $errorMessageToLog, FILE_APPEND);
    echo '<h1 style="color: #F00; font-size: 240%; font-weight: bold;">ERROR</h1>';
  }