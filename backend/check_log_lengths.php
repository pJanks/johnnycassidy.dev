<?php

  ini_set('display_errors', 1);
  date_default_timezone_set('America/Los_Angeles');
  
  $log_prefixes = [
    'error',
    'log',
    'cronjob',
  ];

  $date = new DateTime();
  $date = json_encode($date->format('m.d.y h:i:s A'), JSON_PRETTY_PRINT);
  $messageToLog = "$date: cronjob ran to check log lengths or it was forced\n";
  file_put_contents('/var/www/johnnycassidy.dev/logs/cronjob.log', $messageToLog, FILE_APPEND);

  foreach ($log_prefixes as $prefix) {
    $path = '/var/www/johnnycassidy.dev/logs/';
    $log_file_contents = file_get_contents($path . $prefix . '.log');
    $split_logs = explode("\n", $log_file_contents);
    $count = count($split_logs);

    if ($count >= 5000) {
      $most_recent_split_logs = array_slice($split_logs, -2500, 2500);
      $most_recent_logs = implode("\n", $most_recent_split_logs);
      $messageToLog = "$date: $prefix log cut in half to save memory\n";
      file_put_contents($path . $prefix . '.log', $most_recent_logs . $messageToLog);
    } else {
      echo "<br />$prefix: $count<br />";
    }
  }
