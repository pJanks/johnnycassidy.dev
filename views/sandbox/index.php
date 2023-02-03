<?php
  // ! FIX THIS AFTER GTO TESTING . . .
  // require_once 'config.php';
  // $ip = $_SERVER['REMOTE_ADDR'];
  // if ($ip !== $myIp) return header('Location: /404');
?>
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sandbox</title>
    <link rel="stylesheet" href="views/sandbox/reset.css">
    <link rel="stylesheet" href="views/sandbox/sandbox.css">
  </head>
  <body>
    <main>
      <h1><span class="calculator-type">click 40</span>tester</h1>
      <form class="height-and-width">
        <input class="height" type="decimal" placeholder="height" required autofocus>
        <input class="width" type="decimal" placeholder="width" required>
        <div class="radio-input-wrapper">
          <input
            class="vertical"
            type="radio"
            id="vertical"
            name="orientation"
            value="vertical"
            checked
          >
          <label for="vertical">vertical</label><br>
          <input
            class="horizontal"
            type="radio"
            id="horizontal"
            name="orientation"
            value="horizontal"
          >
          <label for="horizontal">horizontal</label>
        </div>
        <button>submit</button>
      </form>
      <span class="profiles-needed">Profiles Needed:</span>
      <span class="rails-needed">Rails Needed:</span>
      <span class="angles-needed">Angles Needed:</span>
      <span class="profiles-price">Profiles Price:</span>
      <span class="rails-price">Rails Price:</span>
      <span class="angles-price">Angles Price:</span>
    </main>
  </body>
  <script src="views/sandbox/sandbox.js"></script>
</html>