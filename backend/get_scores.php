<?php
  require_once '../config.php';

  $date = new DateTime();
  $date = json_encode($date->format('m.d.y h:i:s A'), JSON_PRETTY_PRINT);

  try {
    $sql = 'SELECT * FROM scores ORDER BY score DESC LIMIT 10';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $scores = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      array_push($scores, $row);
    }

    $successMessage = "$date retrieved scores\n";
    file_put_contents('../logs/log.log', $successMessage, FILE_APPEND);
    echo json_encode($scores, JSON_PRETTY_PRINT);
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR GETTING scores TABLE: ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('../logs/error.log', $errorMessage, FILE_APPEND);
    echo json_encode(['message' => $errorMessage], JSON_PRETTY_PRINT);
  }