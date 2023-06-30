<?php
  require_once 'config.php';
  $ip = $_SERVER['REMOTE_ADDR'];
  if ($ip !== $myIp) return header('Location: /404');
?>
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sandbox</title>
    <!-- <link rel="stylesheet" href="views/sandbox/reset.css"> -->
    <link rel="stylesheet" href="views/sandbox/sandbox.css">
  </head>
  <body>
    <?= 'echo index.php'; ?>
  </body>
  <script src="views/sandbox/sandbox.js"></script>
</html>