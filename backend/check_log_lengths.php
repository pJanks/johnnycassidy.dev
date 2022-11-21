<?php
  date_default_timezone_set('America/Los_Angeles');
  
  $log_prefixes = [
    'error',
    'log',
    'cronjob',
  ];

  $date = new DateTime();
  $formattedDate = $date->format('m.d.y h:i:s A');
  $path = '/var/www/johnnycassidy.dev/logs/';

  $messageToLog = "$formattedDate: cronjob ran to check log lengths or it was forced\n";
  file_put_contents($path . 'cronjob.log', $messageToLog, FILE_APPEND);

  foreach ($log_prefixes as $prefix) {
    $log_file_contents = file_get_contents($path . $prefix . '.log');
    $split_logs = explode("\n", $log_file_contents);
    $countWithoutTrailingNewline = count($split_logs) - 1;

    if ($countWithoutTrailingNewline >= 10000) {
      $most_recent_split_logs = array_slice($split_logs, -5000, 5000);
      $most_recent_logs = implode("\n", $most_recent_split_logs);
      $messageToLog = "$formattedDate: $prefix.log cut in half to save memory\n";
      file_put_contents($path . 'log.log', $most_recent_logs . $messageToLog);
    }

    echo "
      <span style='font-size: 32px;'>
        $prefix.log entries: $countWithoutTrailingNewline<br><br>
      </span>
    ";
  }
