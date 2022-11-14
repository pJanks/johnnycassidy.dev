<?php
  require_once 'config.php';
  $ip = $_SERVER['REMOTE_ADDR'];
  if ($ip !== $myIp) {
    echo '
      <section class="message-wrapper">
        <h1 class="message-heading">under construction</h1>
        <h3 class="message">Sorry, this page will be available soon . . .</h3>
        <a class="back-to-home-link" href="/">back to r00t</a>
      </section>
    ';
    return;
  }
?>
<section class="projects-wrapper">
  <article class="project-wrapper">
    <h2 class="project-heading">Planet 13 Client Summoning App</h2>
    <section class="project-description-wrapper">
      <p class="project-description-paragraph">
        This application was built for the <a href="https://www.planet13dispensaries.com/" class="description-link">Planet 13</a> dispensary in Las Vegas, <abbr title="Nevada">NV</abbr> and Santa Ana, <abbr title="California">CA</abbr>. It allows an employee to summon the next client in their queue (a service provided externally by <a class="description-link" href="https://www.nemo-q.com/">NEMO-Q</a>) to one of the many <abbr title="Point of Sale">POS</abbr> systems on the sales floor. The example provided here is only demonstrating the frontend of the application on an emulator. The backend of the application is not currently publically available. The test information displayed would normally be populated with the clients initials or name and the last four numbers of the phone number they used to register in the queue.
      </p>
      <p class="project-description-paragraph">
        This currently serves ~74 POS systems in Las Vegas and ~50 systems in Santa Ana. This service is running on a <a class="description-link" href="https://www.digitalocean.com/">digitalocean</a> droplet running <a class="description-link" href="https://www.centos.org/">Centos 8</a>. A decision was made to remake a previous web-view based version that was using external software to process animations with a native Android app in 2022, as this application runs on a T95 Android TV Box and it eliminated the need for outside support.
      </p>
    </section>
    <section class="project-video-or-image-wrapper">
      <video
        class="project-video-or-image p13-summoning"
        autoplay
        loop
        muted
      >
        <source src="/assets/videos/p13_summoning_app.webm" type="video/webm">
        <source src="/assets/videos/p13_summoning_app.mp4" type="video/mp4">
        Your browser does not support the HTML video element.
      </video>
      <span class="caption">
        An example of an employee calling the next customer in the queue to register 85.
      </span>
    </section>
    <section class="tech-stack-wrapper">
      <h3 class="tech-stack-heading">Technology Stack</h3>
      <span class="tech-stack-span-wrapper">
        <span class="technology-span">Dart</span>
        <span class="technology-span">Flutter</span>
        <span class="technology-span">MySQL</span>
        <span class="technology-span">JavaScript</span>
        <span class="technology-span">NodeJS</span>
        <span class="technology-span">Android</span>
      </span>
    </section>
    <section class="links-wrapper">
      <a class="view-live-site-or-github-link" href="https://github.com/pJanks/p13_client_summoning_app">View Repo on GitHub</a>
    </section>
  </article>

  <article class="project-wrapper">
    <h2 class="project-heading">Metro Sustainability Dashboard</h2>
    <section class="project-description-wrapper">
      <p class="project-description-paragraph">
        This website is built to transparently display projected metrics as well as the favorable and unfavorable accuracy when either meeting, surpassing, or failing to reach those projections. I currently maintain the site, updating it with new metrics every year and with new features biyearly.
      </p>
      <p class="project-description-paragraph">
        This site was my first experience with Laravel, and as such, there are many things I feel were overengineered or incorrectly implemented. I plan to refactor this site during the next feature update in 2023 to be more efficient and to use better standard/modern practices.
      </p>
    </section>
    <section class="project-video-or-image-wrapper">
      <img
        class="project-video-or-image"
        src="/assets/images/metro_sustainability_dashboard.png"
        alt="a screenshot of Los Angeles Metro's Sustainability Dashboard"
      >
      <span class="caption">
        An example of the page for Solid Waste metrics displaying a line-over-bar graph.
      </span>
    </section>
    <section class="tech-stack-wrapper">
      <h3 class="tech-stack-heading">Technology Stack</h3>
      <span class="tech-stack-span-wrapper">
        <span class="technology-span">PHP</span>
        <span class="technology-span">Laravel</span>
        <span class="technology-span">JavaScript</span>
        <span class="technology-span">jQuery</span>
        <span class="technology-span">MySQL</span>
        <span class="technology-span">CSS3</span>
        <span class="technology-span">HTML5</span>
        <span class="technology-span">ApexCharts</span>
      </span>
    </section>
    <section class="links-wrapper">
      <a class="view-live-site-or-github-link" href="https://sustainabilityreporting.metro.net/">View Live Site</a>
    </section>
  </article>
</section>