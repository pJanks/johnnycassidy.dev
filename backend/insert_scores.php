<?php
  require_once '../config.php';

  $date = new DateTime();
  $date = $date->format('m.d.y h:i:s A');

  try {
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

    $successMessage = "$date inserted into scores\n";
    file_put_contents('../logs/log.log', $successMessage, FILE_APPEND);
    echo json_encode(['message' => $successMessage], JSON_PRETTY_PRINT);
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR INSERTING INTO scores TABLE: ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('../logs/error.log', $errorMessage, FILE_APPEND);
    echo json_encode(['message' => $errorMessage], JSON_PRETTY_PRINT);
  }