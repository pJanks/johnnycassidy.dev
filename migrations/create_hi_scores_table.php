<?php
  require_once '../config.php';

  $date = new DateTime();
  $date = json_encode($date->format('m.d.y h:i:s A'), JSON_PRETTY_PRINT);

  try {
    $sql = '
      CREATE TABLE hi_scores (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        score INT(20) UNSIGNED,
        name VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    ';
  
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $successMessage = "$date hi_scores table created";
    file_put_contents('../logs/log.log', $successMessage, FILE_APPEND);
    echo json_encode(['message' => $successMessage], JSON_PRETTY_PRINT);
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR hi_scores TABLE WASN\'T CREATED. ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('../logs/error.log', $errorMessage, FILE_APPEND);
    echo json_encode(['message' => $errorMessage], JSON_PRETTY_PRINT);
  }