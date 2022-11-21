<?php
  date_default_timezone_set('America/Los_Angeles');

  $date = new DateTime();
  $formattedDate = $date->format('m.d.y h:i:s A');
  
  $path = '/var/www/johnnycassidy.dev/logs/';
  $logs = [
    'error',
    'log',
    'cronjob',
  ];

  $cronMessageToLog = "$formattedDate: cronjob ran to check log lengths or it was forced\n";
  file_put_contents($path . 'cronjob.log', $cronMessageToLog, FILE_APPEND);

  foreach ($logs as $log) {
    $logFileContents = file_get_contents($path . $log . '.log');
    $splitLogs = explode("\n", $logFileContents);
    $countWithoutTrailingNewline = count($splitLogs) - 1;

    if ($countWithoutTrailingNewline >= 10000) {
      $mostRecentSplitLogs = array_slice($split_logs, -5000, 5000);
      $mostRecentLogs = implode("\n", $mostRecentSplitLogs);
      $messageToLog = "$formattedDate: $log.log cut in half to save memory\n";
      file_put_contents($path . 'log.log', $mostRecentLogs . $messageToLog);
    }
    
    $openingSpan = '<span style="font-size: 32px;">';
    $spanContents = "$log.log entries: $countWithoutTrailingNewline<br><br>";
    $closingSpan = '</span>';
    echo $openingSpan . $spanContents . $closingSpan;
  }
