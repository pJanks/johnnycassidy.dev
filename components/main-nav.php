<nav class="main-nav">
  <ul class="nav-list">
    <?php
      $navListItems = [
        'home' => '/',
        'projects' => '/projects',
        'snake' => '/snake',
        'facts' => '/facts',
        // 'sandbox' => '/sandbox',
      ];

      foreach ($navListItems as $key => $link) {
        echo "
          <li class='nav-list-item $key-nav-list-item'>
            <a class='nav-list-item-link $key-nav-list-item-link' href='$link'>
              $key
            </a>
          </li>
        ";
      }
    ?>
  </ul>
</nav>