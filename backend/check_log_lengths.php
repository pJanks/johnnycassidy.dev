<?php
  date_default_timezone_set('America/Los_Angeles');
  $dateTime = new DateTime();
  $date = $dateTime->format('m.d.y h:i:s A T');
  $path = '/var/www/johnnycassidy.dev/logs/';
  
  try {
    $logs = [
      'error',
      'log',
      'cronjob',
    ];
  
    $cronMessageToLog = "$date: cronjob ran to check log lengths or it was forced\n";
    file_put_contents($path . 'cronjob.log', $cronMessageToLog, FILE_APPEND);
  
    foreach ($logs as $log) {
      $logFileContents = file_get_contents($path . $log . '.log');
      $splitLogs = explode("\n", $logFileContents);
      $countWithoutTrailingNewline = count($splitLogs) - 1;
  
      if ($countWithoutTrailingNewline >= 10000) {
        $mostRecentSplitLogs = array_slice($split_logs, -5000, 5000);
        $mostRecentLogs = implode("\n", $mostRecentSplitLogs);
        $messageToLog = "$date: $log.log cut in half to save memory\n";
        file_put_contents($path . 'log.log', $mostRecentLogs . $messageToLog);
      }
      
      $openingSpan = '<span style="font-size: 32px;">';
      $spanContents = "$log.log entries: $countWithoutTrailingNewline<br><br>";
      $closingSpan = '</span>';
      echo $openingSpan . $spanContents . $closingSpan;
    }
  } catch(Exception $e) {
    $errorMessage = $e->getMessage();
    $errorLine = $e->getLine();
    $errorMessageToLog = "$date: ERROR WITH CRONJOB: $errorMessage line: $errorLine\n";
    file_put_contents($path . 'error.log', $errorMessageToLog, FILE_APPEND);
    echo '<h1 style="color: #F00; font-size: 240%; font-weight: bold;">ERROR</h1>';
  }