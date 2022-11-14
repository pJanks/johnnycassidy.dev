<?php
  require_once 'config.php';

  if (!isset($_SESSION['hasVisited'])) {
    $_SESSION['hasVisited'] = true;
    $sql = "UPDATE visitor_counter SET counter = counter + 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
  }