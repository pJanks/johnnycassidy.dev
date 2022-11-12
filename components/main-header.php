<?php
  $path = strtolower(explode('/', $_SERVER['REQUEST_URI'])[1]);
  $slideInVerification = ($path === 'home' || !$path) ?  'slide-in' : '';
?>
<header class="main-header">
  <section class="jcdotdev-wrapper <?= $slideInVerification; ?>">
    <a class="jcdotdev" href="/">JC<span class="jcdotdev-small">DOT</span>DEV</a>
  </section>
  <?php require_once 'components/main-nav.php'; ?>
</header>
