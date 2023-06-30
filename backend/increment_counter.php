<?php
  try {
    require_once 'config.php';
    $dateTime = new DateTime();
    $date = $dateTime->format('m.d.y h:i:s A T');

    if (!isset($_SESSION['hasVisited']) || empty($_SESSION['hasVisited'])) {
      $_SESSION['hasVisited'] = true;
      $sql = "UPDATE visitor_counter SET counter = counter + 1";
      $stmt = $pdo->prepare($sql);
      $stmt->execute();

      $ip = $_SERVER['REMOTE_ADDR'];
      $successMessage = "$date $ip visited\n";
      file_put_contents('logs/log.log', $successMessage, FILE_APPEND);
      unset($stmt);
      unset($pdo);
    }
  } catch(Exception $e) {
    $errorMessage = $e->getMessage();
    $errorLine = $e->getLine();
    $errorMessageToLog = "$date: ERROR UPDATING visitor_counter: $errorMessage line: $errorLine\n";
    file_put_contents('/var/www/johnnycassidy.dev/logs/error.log', $errorMessageToLog, FILE_APPEND);
    echo '<h1 style="color: #F00; font-size: 240%; font-weight: bold;">ERROR</h1>';
  }