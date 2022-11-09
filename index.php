<?php

  // remove if ever in production
  ini_set("display_errors", 1);
  error_reporting(E_ALL);
  session_start();
  
  $request_uri = strtolower(rtrim($_SERVER["REQUEST_URI"], "/"));
  $route = explode("/", $request_uri)[1] ?? "home";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>johnnycassidy.dev</title>
    <link rel="stylesheet" href="/global.css">
    <?= "<link rel=stylesheet href=/views/$route/$route.css>"; ?>
  </head>
  <body>
    <?php require "components/main-header.php" ?>
    <main class="app-wrapper">
      <?php
        switch ($request_uri) {
          case "":
          case "/home":
          case "/snake":
          case "/sandbox":
          case "/projects":
          case "/404":
            require "views/$route/index.html";
          break;
          default:
            header("Location: /404");
          break;
        }
      ?>
    </main>
  </body>
  <script src="/global.js"></script>
  <?= "<script src=/views/$route/$route.js></script>"; ?>
</html>