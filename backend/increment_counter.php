<?php
  try {
    require_once 'config.php';
    
    $date = new DateTime();
    $date = $date->format('m.d.y h:i:s A');

    if (!isset($_SESSION['hasVisited']) || empty($_SESSION['hasVisited'])) {
      $_SESSION['hasVisited'] = true;
      $sql = "UPDATE visitor_counter SET counter = counter + 1";
      $stmt = $pdo->prepare($sql);
      $stmt->execute();

      $ip = $_SERVER['REMOTE_ADDR'];
      $successMessage = "$date $ip visited\n";
      file_put_contents('logs/log.log', $successMessage, FILE_APPEND);
    }
  } catch(PDOException $e) {
    $errorMessage = $date . ' ERROR UPDATING visitor_counter: ' . $e->getMessage() . ' line: ' . $e->getLine() . "\n";
    file_put_contents('logs/error.log', $errorMessage, FILE_APPEND);
  }