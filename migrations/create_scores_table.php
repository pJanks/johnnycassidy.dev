<?php
  require_once 'config.php';

  $date = new DateTime();
  $date = $date->format('m.d.y h:i:s A');

  try {
    $sql = '
      CREATE TABLE scores (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        score INT(20) UNSIGNED,
        name VARCHAR(255) NOT NULL,
        time VARCHAR(30) NOT NULL,
        pills_eaten INT(20) UNSIGNED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    ';
  
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $successMessage = "$date scores table created\n";
    file_put_contents('logs/log.log', $successMessage, FILE_APPEND);
    echo json_encode(['message' => $successMessage], JSON_PRETTY_PRINT);
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR scores TABLE WASN\'T CREATED. ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('logs/error.log', $errorMessage, FILE_APPEND);
    echo json_encode(['message' => $errorMessage], JSON_PRETTY_PRINT);
  }