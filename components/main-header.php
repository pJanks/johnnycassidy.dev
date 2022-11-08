<?php
  $slideInVerification = '';
  $path = strtolower(explode('/', $_SERVER['REQUEST_URI'])[1]);
  ($path === 'home' || !$path) ? $slideInVerification = 'slide-in' : null;
?>

<header class="main-header">
  <section class="jcdotdev-wrapper <?= $slideInVerification ?? ''; ?>">
    <a class="jcdotdev" href="/">JC<span class="jcdotdev-small">DOT</span>DEV</a>
  </section>
  <?php require_once 'components/main-nav.php'; ?>
</header>