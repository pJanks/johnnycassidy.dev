<?php
  session_start();
  require_once 'backend/increment_counter.php';
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
    <?php require_once "components/main-header.php" ?>
    <main class="app-wrapper">
      <?php
        switch ($request_uri) {
          case "":
          case "/home":
          case "/projects":
          case "/snake":
          case "/sandbox":
          case "/404":
            require_once "views/$route/index.html";
            break;
          default:
            header("Location: /404");
          break;
        }
      ?>
    </main>
  </body>
  <script src="/global.js"></script>
  <?php
    if ($route === "snake" || $route === "sandbox") {
      echo "<script src=/views/$route/$route.js></script>";
    }
  ?>
</html>