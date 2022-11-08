<?php
  require_once '../config.php';

  $date = new DateTime();
  $date = json_encode($date->format('m.d.y h:i:s A'), JSON_PRETTY_PRINT);

  try {
  $sql = 'SELECT * FROM hi_scores';
  $stmt = $pdo->prepare($sql);
  $stmt->execute();

  $hiScores = $stmt->fetch(PDO::FETCH_ASSOC);

  $successMessage = "$date retrieved hi_scores";
  file_put_contents('../logs/log.log', $successMessage, FILE_APPEND);
  echo json_encode([
    'message' => $successMessage,
    'hi_scores' => $hiScores,
  ], JSON_PRETTY_PRINT);
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR UPDATING hi_scores TABLE: ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('../logs/error.log', $errorMessage, FILE_APPEND);
    echo json_encode(['message' => $errorMessage], JSON_PRETTY_PRINT);
  }