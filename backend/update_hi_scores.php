<?php
  require_once '../config.php';

  $date = new DateTime();
  $date = json_encode($date->format('m.d.y h:i:s A'), JSON_PRETTY_PRINT);

  try {
    
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR UPDATING hi_scores TABLE: ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('../logs/error.log', $errorMessage, FILE_APPEND);
    echo json_encode(['message' => $errorMessage], JSON_PRETTY_PRINT);
  }